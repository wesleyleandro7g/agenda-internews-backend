const MotivoFechamento = require('../models/MotivoFechamento')

module.exports = {
    async createNewClosingReason(req, res){
        try {
            const { descricao } = req.body

            const reason = await MotivoFechamento.findOne({
                where: {
                    descricao
                }
            })

            if(reason) return res.status(400).send('Motivo de fechamento já cadastrado!')

            const newReason = await MotivoFechamento.create({ descricao })

            return res.status(200).json(newReason)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllClosingReasons(req, res){
        try {
            const reason = await MotivoFechamento.findAll()

            return res.status(200).json(reason)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listDetailsClosingReason(req, res){
        try {
            const reason = await MotivoFechamento.findAll({
                include: {
                    association: 'atendimentos'
                }
            })

            return res.status(200).json(reason)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}