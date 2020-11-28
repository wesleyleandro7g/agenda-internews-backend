const Modulo = require('../models/Modulo')

module.exports = {
    async listAllModules(req, res){
        try {
            const modules = await Modulo.findAll({
                include: {
                    association: 'clientes'
                }
            })

            return res.status(200).json(modules)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}