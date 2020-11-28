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
            const attendences = await Atendimentos.findAll({
                include: [
                    { association: 'cliente' },
                    { association: 'suporte' }
                ]
            })

            return res.status(200).json(attendences)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}