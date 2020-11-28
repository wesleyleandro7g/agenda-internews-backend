const MotivoAbertura = require('../models/MotivoAbertura')

module.exports = {
    async createNewOpeningReason(req, res){
        try {
            const { descricao } = req.body

            const reason = await MotivoAbertura.findOne({
                where: {
                    descricao
                }
            })

            if(reason) return res.status(400).send('Motivo de abertura já cadastrado!')

            const newReason = await MotivoAbertura.create({ descricao })

            return res.status(200).json(newReason)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllOpeningReasons(req, res){
        try {
            const reason = await MotivoAbertura.findAll({
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