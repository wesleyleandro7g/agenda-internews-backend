const Ramo = require('../models/RamoAtividade')

module.exports = {
    async createNewIndustry(req, res){
        try {
            const { descricao } = req.body

            if (!descricao) return res.status(400).json({ response: 'Dados incompletos!' })

            const industry = await Ramo.findOne({
                where: {
                    descricao
                }
            })

            if(industry) return res.status(400).json({ response: 'Ramo de atividade já cadastrado!' })

            await Ramo.create({ descricao })

            return res.status(200).json({ response: 'Ramo de Atividade Cadastrado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllIndustries(req, res){ // Remover a associação de clientes
        try {
            const industries = await Ramo.findAll({
                include: {
                    association: 'clientes'
                }
            })

            if (industries.length <= 0) res.status(404).json({ response: 'Nenhum Ramo de Atividade Cadastrado!' })

            return res.status(200).json(industries)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async updateIndustrie(req, res){
        try {
            const { id } = req.params
            const { descricao } = req.body

            if(!descricao) return res.status(400).json({ response: 'Informe o novo valor!' })

            const industrie = await Ramo.findOne({ where: { descricao } })

            if (industrie) return res.status(400).json({ response: 'Descrição já utilizada!' })

            await Ramo.update({
                descricao
            },{
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Ramo alterado com sucesso!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async deleteIndustrie(req, res){
        try {
            const { id } = req.params

            const industrie = await Ramo.findByPk(id, {
                include: {
                    association: 'clientes'
                }
            })

            if (!industrie) return res.status(404).send({ error: 'Ramo não encontado!' })

            if (industrie.clientes.length >= 1) {
                return res.status(404).send({ error: 'Este ramo não pode ser deletado, pois possui clientes associados a ele!' })
            }

            await Ramo.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Ramo deletado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}