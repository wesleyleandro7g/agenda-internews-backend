const Atendimentos = require('../models/Atendimentos')
const Suporte = require('../models/Suporte')

module.exports = {
    async createNewAttendance(req, res){
        try {
            const {
                nome_solicitante,
                contato_solicitante,
                cliente_solicitou,
                reagendado,
                data_agendamento,
                hora_agendamento,
                status,
                id_cliente,
                id_usuario,
                id_abertura,
                id_fechamento,
                id_suporte,
                id_setor
            } = req.body

            const newAttendence = await Atendimentos.create({
                nome_solicitante,
                contato_solicitante,
                cliente_solicitou,
                reagendado,
                data_agendamento,
                hora_agendamento,
                status,
                id_cliente,
                id_usuario,
                id_abertura,
                id_fechamento,
                id_suporte,
                id_setor
            })

            return res.status(200).json(newAttendence)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async listAllAttendences(req, res){
        try {
            const { count, rows: attendences } = await Atendimentos.findAndCountAll({
                include: [
                    { association: 'cliente' },
                    { association: 'suporte' },
                    { association: 'abertura' }
                ]
            })

            return res.status(200).json({ attendences, count })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listSupportAttendences(req, res){
        try {
            const { id_usuario } = req.headers

            const suporte = await Suporte.findOne({
                where: {
                    id_usuario
                }
            })

            if(!suporte) return res.status(404).send('Suporte não encontrado!')
            
            const { count, rows: attendences } = await Atendimentos.findAndCountAll({
                include: [
                    { association: 'cliente' },
                    { association: 'suporte' },
                    { association: 'abertura' }
                ],
                where: {
                    id_suporte: suporte.id
                }
            })

            return res.status(200).json({ attendences, count })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async repassAttendence(req, res){
        try {
            const { id, id_suporte } = req.body

            const attendence = await Atendimentos.update({
                id_suporte
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ attendence })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}