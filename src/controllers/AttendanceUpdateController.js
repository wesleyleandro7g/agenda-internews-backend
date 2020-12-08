const Atendimentos = require('../models/Atendimentos')

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
                id_status,
                id_cliente,
                id_usuario,
                id_abertura,
                id_fechamento,
                id_suporte,
                id_setor
            } = req.body

            await Atendimentos.create({
                nome_solicitante,
                contato_solicitante,
                cliente_solicitou,
                reagendado,
                data_agendamento,
                hora_agendamento,
                id_status,
                id_cliente,
                id_usuario,
                id_abertura,
                id_fechamento,
                id_suporte,
                id_setor
            })

            return res.status(200).json({ mensage: 'Atendimento aberto! '})
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async openAttendence(req, res){
        try {
            const { id } = req.body

            await Atendimentos.update({
                id_status: 1
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ mensage: 'Atendimento iniciado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async repassAttendence(req, res){
        try {
            const { id, id_suporte } = req.body

            await Atendimentos.update({
                id_suporte,
                id_status: 2
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ mensage: 'Atendimento repassado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async closeAttendence(req, res){
        try {
            const { id, id_fechamento } = req.body

            await Atendimentos.update({
                id_fechamento,
                id_status: 4

            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ mensage: 'Atendimento finalizado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}