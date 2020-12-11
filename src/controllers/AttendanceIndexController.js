const Atendimentos = require('../models/Atendimentos')
const Suporte = require('../models/Suporte')

module.exports = {
    async listAllAttendences(req, res){
        try {
            const { count, rows: attendences } = await Atendimentos.findAndCountAll({
                include: [
                    { association: 'cliente' },
                    { association: 'suporte' },
                    { association: 'abertura' },
                    { association: 'status' },
                    { association: 'usuario' },
                    { association: 'fechamento' }
                ]                
            }, {
                order: ['id', 'DESC']
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
                    { association: 'abertura' },
                    { association: 'status' },
                    { association: 'usuario' },
                    { association: 'fechamento' }
                ],
                where: {
                    id_suporte: suporte.id,
                    id_status: [1, 2, 3]
                },
                order: [
                    ['id', 'DESC']
                ]
            })

            return res.status(200).json({ attendences, count })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async listSupportClosedAttendences(req, res){
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
                    { association: 'abertura' },
                    { association: 'fechamento' },
                    { association: 'status' },
                    { association: 'usuario' }
                    
                ],
                where: {
                    id_suporte: suporte.id,
                    id_status: 4
                },
                order: [
                    ['id', 'DESC']
                ]
            })

            return res.status(200).json({ attendences, count })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async listClientAttendences(req, res){
        try {
            const { id_cliente } = req.params

            
            const { count, rows: attendences } = await Atendimentos.findAndCountAll({
                include: [
                    { association: 'suporte' },
                    { association: 'abertura' },
                    { association: 'status' },
                    { association: 'usuario' }
                ],
                where: {
                    id_cliente,
                    id_status: [1, 2, 3]
                },
                order: [
                    ['id', 'DESC'],
                    ['id_status', 'ASC']
                ]
            })

            return res.status(200).json({ attendences, count })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },
}