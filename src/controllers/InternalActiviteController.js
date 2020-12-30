const AtividadeInterna = require('../models/AtividadeInterna')

module.exports = {
    async createNewActivity(req, res){
        try {
            const { descricao } = req.body

            const activity = await AtividadeInterna.findOne({
                where: {
                    descricao
                }
            })

            if(activity) return res.status(400).json({ mensage: 'Atividade já cadastrada!' })

            await AtividadeInterna.create({ descricao })

            return res.status(200).json({ mensage: 'Atividade cadastrada!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllActivities(req, res){
        try {
            const activities = await AtividadeInterna.findAll()

            return res.status(200).json(activities)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}