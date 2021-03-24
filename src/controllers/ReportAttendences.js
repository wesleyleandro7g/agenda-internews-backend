const Atendimentos = require('../models/Atendimentos')
const AtividadeInterna = require('../models/AtividadeInterna')
const Clientes = require('../models/Clientes')
const Suporte = require('../models/Suporte')
const { Op } = require('sequelize')

module.exports = {
    async unattendedCostumerAll(req, res) {
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

			const { count, rows: clients} = await Clientes.findAndCountAll({
				attributes: [ 'id', 'nome' ],
				where: {
					id_atividade_interna: [...validActivitiesID]
				}
			})
			// 11.143.810/0001-13 (Ronildo)
			const date = new Date()
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			
			const attendences = await Atendimentos.findAll({
				attributes: [ 'id', 'createdAt', 'id_cliente' ],
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				}
			})
			
			const Object = []
			
			clients.map(client => {
				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						Object.push(client.id)
					}
				})
			})
			
			const uniqueValue = [...new Set(Object)]

			const unattendedCostumer = await Clientes.findAll({
				attributes: ['id', 'nome'],
				where: {
					id: {
						[Op.not]: [...uniqueValue]
					},
					id_atividade_interna: [...validActivitiesID]
				}
			})

			return res.status(200).json({ unattendedCostumer })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
	async costumersServedAll(req, res) {
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

			const { count, rows: clients} = await Clientes.findAndCountAll({
				attributes: [ 'id', 'nome' ],
				where: {
					id_atividade_interna: [...validActivitiesID]
				}
			})
			
			const date = new Date()
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			
			const attendences = await Atendimentos.findAll({
				attributes: [ 'id', 'createdAt', 'id_cliente' ],
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				}
			})
			
			const Object = []
			
			clients.map(client => {
				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						Object.push(client.id)
					}
				})
			})
			
			const uniqueValue = [...new Set(Object)]

			const unattendedCostumer = await Clientes.findAll({
				attributes: ['id', 'nome'],
				where: {
					id: [...uniqueValue],
					id_atividade_interna: [...validActivitiesID]
				}
			})

			return res.status(200).json({ unattendedCostumer })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
	async unattendedCostumerPerSupport(req, res) {
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
				attributes: [ 'id', 'createdAt', 'id_cliente' ],
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				}
			})
			
			const Object = []
			
			clients.map(client => {
				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						Object.push(client.id)
					}
				})
			})
			
			const uniqueValue = [...new Set(Object)]

			const unattendedCostumer = await Clientes.findAll({
				attributes: ['id', 'nome'],
				where: {
					id: {
						[Op.not]: [...uniqueValue]
					},
					id_atividade_interna: [...validActivitiesID],
					id_suporte: suporte.id
				},
				include: [
					{ association: 'suporte' }
				]
			})

			return res.status(200).json({ unattendedCostumer })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
	async costumersServedPerSupport(req, res) {
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
				attributes: [ 'id', 'createdAt', 'id_cliente' ],
				where: {
					id_status: 4,
					created_at: {
						[Op.gte]: initial_date ? initial_date : firstDay,
						[Op.lte]: finish_date ? finish_date : lastDay
					}
				}
			})
			
			const Object = []
			
			clients.map(client => {
				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						Object.push(client.id)
					}
				})
			})
			
			const uniqueValue = [...new Set(Object)]

			const unattendedCostumer = await Clientes.findAll({
				attributes: ['id', 'nome'],
				where: {
					id: [...uniqueValue],
					id_atividade_interna: [...validActivitiesID],
					id_suporte: suporte.id
				},
				include: [
					{ association: 'suporte' }
				]
			})

			return res.status(200).json({ unattendedCostumer })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}