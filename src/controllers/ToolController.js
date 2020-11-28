const Ferramenta = require('../models/Ferramenta')

module.exports = {
    async createNewTool(req, res){
        try {
            const { descricao } = req.body

            const tool = await Ferramenta.findOne({
                where: {
                    descricao
                }
            })

            if(tool) return res.status(400).send('Ferramenta já cadastrada!')

            const newTool = await Ferramenta.create({ descricao })

            return res.status(200).json(newTool)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllTools(req, res){
        try {
            const tools = await Ferramenta.findAll({
                include: {
                    association: 'clientes'
                }
            })

            return res.status(200).json(tools)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}