const Atendimentos = require('../models/Atendimentos')
const AtividadeInterna = require('../models/AtividadeInterna')
const Clientes = require('../models/Clientes')
const { Op } = require('sequelize')

module.exports = {
    async unattendedCostumer(req, res) {
        try {
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
						[Op.gte]: firstDay,
						[Op.lte]: lastDay
					}
				}
			})
			
			const Object = []
			const Data = []
			
			clients.map(client => {
				attendences.map(attendence => {
					if(attendence.id_cliente === client.id){
						Object.push(client.id)
					}
				})
			})
			
			const uniqueValue = [...new Set(Object)]
			const clientsServerd = uniqueValue.length

            const unattendedCostumers = await Clientes.findAll({
                where: {
                    id: [...uniqueValue]
                }
            })
			
			Data.push(
				{
					name: 'atendidos',
					value: clientsServerd
				},
				{
					name: 'nao atendidos',
					value: count - clientsServerd
				},
                {
                    unattendedCostumers
                }
            )
				
				
				return res.status(200).json({ Data })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}