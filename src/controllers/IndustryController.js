const Ramo = require('../models/RamoAtividade')

module.exports = {
    async createNewIndustry(req, res){
        try {
            const { descricao } = req.body

            const industry = await Ramo.findOne({
                where: {
                    descricao
                }
            })

            if(industry) return res.status(400).send('Ramo de atividade já cadastrado!')

            const newIndustry = await Ramo.create({ descricao })

            return res.status(200).json(newIndustry)
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

            return res.status(200).json(industries)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async updateIndustrie(req, res){
        try {
            const { id } = req.params
            const { descricao } = req.body

            if(!descricao) return res.status(404).send({ error: 'Informe o novo valor!' })

            const industrie = await Ramo.findByPk(id)

            if (!industrie) return res.status(404).send({ error: 'Ramo não encontrado!' })

            await Ramo.update({
                descricao
            },{
                where: {
                    id
                }
            })

            return res.status(200).send("Sucesso!")
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async deleteIndustrie(req, res){
        try {
            const { id } = req.params

            const industrie = await Ramo.findByPk(id)

            if (!industrie) return res.status(404).send({ error: 'Ramo não encontado!' })

            await Ramo.destroy({
                where: {
                    id
                }
            })

            return res.status(200).send("Sucesso!")
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}