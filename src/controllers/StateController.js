const Estados = require('../models/Estados')

module.exports = {
    async listAllStates(req, res){
        try {
            const states = await Estados.findAll({
                include: {
                    association: 'clientes'
                }
            })

            return res.status(200).json(states)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}