const Cidade = require('../models/Cidade')

module.exports = {
    async createNewCity(req, res){
        try {
            const { descricao, id_estado } = req.body

            const city = await Cidade.findOne({
                where: {
                    descricao
                }
            })

            if(city) return res.status(400).send('Cidade já cadastrada!')

            const newCity = await Cidade.create({ descricao, id_estado })

            return res.status(200).json(newCity)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllCities(req, res){
        try {
            const cities = await Cidade.findAll({
                include: [
                    { association: 'clientes' },
                    { association: 'estado' }
                ]
            })

            return res.status(200).json(cities)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}