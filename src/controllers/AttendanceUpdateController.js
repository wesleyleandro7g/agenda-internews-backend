const Atendimentos = require('../models/Atendimentos')
const MotivoFechAtend = require('../models/MotivoFechAtend')

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
            const { id_atendimento, fech_motivos, id_suporte } = req.body

            fech_motivos.forEach(item => {
                MotivoFechAtend.create({
                    id_atendimento,
                    id_motivo: item.id_fechamento

                })
            })

            await Atendimentos.update({
                id_suporte,
                id_status: 4
            }, {
                where: {
                    id: id_atendimento
                }
            })

            return res.status(200).json({ mensage: 'Atendimento finalizado!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    }
}