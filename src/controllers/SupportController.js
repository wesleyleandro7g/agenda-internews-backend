const Suporte = require('../models/Suporte')

module.exports = {
    async createNewSupport(req, res){
        try {
            const { nome, id_usuario } = req.body

            const support = await Suporte.findOne({
                where: {
                    nome
                }
            })

            if(support) return res.status(400).send('Nome de suporte em uso!')

            const newSupport = await Suporte.create({
                nome,
                id_usuario
            })

            return res.status(200).json(newSupport)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllSupports(req, res){
        try {
            const supports = await Suporte.findAll({
                include: {
                    association: 'usuario'
                }
            })

            return res.status(200).json(supports)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}