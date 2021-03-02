const AtividadeInterna = require('../models/AtividadeInterna')

module.exports = {
    async createNewActivity(req, res){
        try {
            const { descricao } = req.body

            if(!descricao) return res.status(400).json({ response: 'Informe a descrição!' })

            const activity = await AtividadeInterna.findOne({
                where: {
                    descricao
                }
            })

            if(activity) return res.status(400).json({ response: 'Atividade já cadastrada!' })

            await AtividadeInterna.create({ descricao })

            return res.status(200).json({ response: 'Atividade cadastrada!' })
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
    },

    async updateActivitie(req, res){
        try {
            const { id } = req.params
            const { descricao } =  req.body

            if (!descricao) return res.status(400).json({ response: 'Informe o novo valor!' })

            const activity = await AtividadeInterna.findOne({ where: { descricao } })

            if(activity) return res.status(400).json({ response: 'Descrição já utilizada!' })

            await AtividadeInterna.update({
                descricao
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Atividade alterada!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async deleteActivitie(req, res){
        try {
            const { id } = req.params

            const activity = await AtividadeInterna.findByPk(id, {
                include: {
                    association: 'clientes'
                }
            })

            if (!activity) return res.status(404).json({ response: 'Atividade não encontrada!' })

            if (activity.clientes.length >= 1) {
                return res.status(400).send({ error: 'Esta atividade não pode ser deletada, pois possui clientes associados a ela!' })
            }

            await AtividadeInterna.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Atividade deletada!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}