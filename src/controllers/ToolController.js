const Ferramenta = require('../models/Ferramenta')
const FerramentaCliente = require('../models/FerramentaCliente')

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

    async registerClientTools(req, res){
        try {
            const { ferramentas, id_cliente } = req.body

            ferramentas.forEach(item => {
                FerramentaCliente.create({
                    id_cliente,
                    id_ferramenta: item.id_ferramenta
                })
            })

            return res.status(200).json({ mensage: 'Ferramenta(s) adicionada(s)!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },

    async listAllTools(req, res){
        try {
            const tools = await Ferramenta.findAll()

            return res.status(200).json(tools)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}