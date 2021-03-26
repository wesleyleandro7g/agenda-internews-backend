const Atendimentos = require('../models/Atendimentos')
const AtividadeInterna = require('../models/AtividadeInterna')
const Clientes = require('../models/Clientes')
const Suporte = require('../models/Suporte')
const { Op } = require('sequelize')

module.exports = {
    async allCallsPerPeriod(req, res) {
        try {
			const { initial_date, finish_date } = req.body
			
            const internalActivitiesValid = await AtividadeInterna.findAll({
				attributes: ['id'],
				where: {
					desconsiderar_relatorio: false
				}
			})

			const validActivitiesID = []
			internalActivitiesValid.map(item => {
				validActivitiesID.push(item.id)
			})

			const clients = await Clientes.findAll({
				attributes: [ 'id', 'nome' ],
				where: {
					id_atividade_interna: [...validActivitiesID]
				}
			})

			const date = new Date()
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

			const attendences = await Atendimentos.findAll({
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				},
				include: [
					{
						association: 'abertura',
						attributes: ['descricao']
					},
					{
						association: 'suporte',
						attributes: ['descricao']
					},
					{
						association: 'fechamento',
						attributes: ['id', 'descricao']
					}
				]
			})

			const TotalAttendences = []

			clients.map(client => {
				var total = 0
				var details = []

				attendences.map(attendence => {
					if(attendence.id_cliente === client.id) {
						total += 1
						details.push({
							attendence
						})
					}
				})

				TotalAttendences.push({
					clientID: client.id,
					clientName: client.nome,
					totalAttendences: total,
					details
				})
			})

			return res.status(200).json({ TotalAttendences })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

	async callsPerPeriodAndPerSupport(req, res) {
        try {
			const { initial_date, finish_date } = req.body
			const { id_usuario } = req.headers

			const suporte = await Suporte.findOne({
				where: {
					id_usuario
				}
			})
			
			if(!suporte) return res.status(404).json({ message: 'Suporte não encontrado!' })

            const internalActivitiesValid = await AtividadeInterna.findAll({
				attributes: ['id'],
				where: {
					desconsiderar_relatorio: false
				}
			})

			const validActivitiesID = []
			internalActivitiesValid.map(item => {
				validActivitiesID.push(item.id)
			})

			const clients = await Clientes.findAll({
				attributes: [ 'id', 'nome' ],
				where: {
					id_atividade_interna: [...validActivitiesID],
					id_suporte: suporte.id
				}
			})
			
			const date = new Date()
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			
			const attendences = await Atendimentos.findAll({
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				},
				include: [
					{
						association: 'abertura',
						attributes: ['descricao']
					},
					{
						association: 'suporte',
						attributes: ['descricao']
					},
					{
						association: 'fechamento',
						attributes: ['id', 'descricao']
					}
				]
			})
			
			const TotalAttendences = []
			
			clients.map(client => {
				var totalAttendences = 0
				var details = []

				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						totalAttendences += 1
						details.push({
							attendence
						})
					}
				})

				TotalAttendences.push({
					clientID: client.id,
					clientName: client.nome,
					totalAttendences,
					details
				})
			})

			return res.status(200).json({ TotalAttendences })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}