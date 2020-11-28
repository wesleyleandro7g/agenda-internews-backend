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
            console.log(error)  
            return res.status(500).json({ error: error });
        }
    },

    async listAllIndustries(req, res){
        try {
            const industries = await Ramo.findAll({
                include: {
                    association: 'clientes'
                }
            })

            return res.status(200).json(industries)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    }
}