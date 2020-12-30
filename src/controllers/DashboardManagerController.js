const Atendimentos = require('../models/Atendimentos')
const Suporte = require('../models/Suporte')
const Clientes = require('../models/Clientes')
const AtividadeInterna = require('../models/AtividadeInterna')
const RamoAtivitade = require('../models/RamoAtividade')
const MotivoFechamento = require('../models/MotivoFechamento')
const MotivoFechAtend = require('../models/MotivoFechAtend')
const { Op } = require('sequelize')

module.exports = {
    async clientsForInternalActivities(req, res){
        try {
            const { count, rows: clients } = await Clientes.findAndCountAll({
                attributes: [
                    'id',
                    'id_atividade_interna'
                ]
            })

            const atividades = await AtividadeInterna.findAll()

            const Value = []            
            const Description = []
            const Data = []

            atividades.map((item, index) => {
                Value.push(clients.filter(client => client.id_atividade_interna === item.id)),
                Description.push(atividades[index].descricao)
            })

            atividades.map((atividade, index) => {
                Data.push({
                    nome: Description[index],
                    quantidade: Value[index].length
                })                
            })

            return res.status(200).json({ Data })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async clientsForIndustries(req, res){
        try {
            const { count, rows: clients } = await Clientes.findAndCountAll({
                attributes: [
                    'id',
                    'id_atividade'
                ]
            })

            const atividades = await RamoAtivitade.findAll()

            const Value = []            
            const Description = []
            const Data = []

            atividades.map((item, index) => {
                Value.push(clients.filter(client => client.id_atividade === item.id)),
                Description.push(atividades[index].descricao)
            })

            atividades.map((atividade, index) => {
                Data.push({
                    nome: Description[index],
                    quantidade: Value[index].length
                })                
            })

            return res.status(200).json({ Data, count })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async attendencesForType(req, res){
        try {
            const attendences = await Atendimentos.findAll({
                attributes: ['id'],
                where: {
                    id_status: 4
                }
            })

            console.log(attendences[0].id)

            const fechamentos = await MotivoFechAtend.findAll({
                where: {
                    id_atendimento: attendences.map(item => item.id)
                }
            })

            const motivos = await MotivoFechamento.findAll()

            const Value = []
            const Description = []
            const Data = []

            motivos.map((item, index) => {
                Value.push(fechamentos.filter(fechamento => fechamento.id_motivo === item.id)),
                Description.push(motivos[index].descricao)
            })

            motivos.map((motivo, index) => {
                Data.push({
                    nome: Description[index],
                    quantidade: Value[index].length
                })                
            })

            return res.status(200).json({ Data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async attendencesForMonth(req, res){
        try {
            const { count, rows: clients} = await Clientes.findAndCountAll({
                attributes: [ 'id' ]
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

            // const newObject = Object.filter((item, index) => Object.indexOf(item) === index)
            const uniqueValue = [...new Set(Object)]
            const clientsServerd = uniqueValue.length

            Data.push(
                {
                    name: 'atendidos',
                    value: clientsServerd
                },
                {
                    name: 'nao atendidos',
                    value: count - clientsServerd
                }
            )


            return res.status(200).json({ Data })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
}