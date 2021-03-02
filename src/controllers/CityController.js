const Cidade = require('../models/Cidade')

module.exports = {
    async createNewCity(req, res){
        try {
            const { descricao, id_estado } = req.body

            if (!descricao || !id_estado) return res.status(400).json({ response: 'Dados incompletos!' })

            const [ newCity, created ] = await Cidade.findOrCreate({
                where: {
                    descricao
                },
                defaults: {
                    descricao,
                    id_estado
                }
            })

            if(!created) return res.status(400).json({ response: `A cidade '${newCity.descricao}' já está cadastrada!` })

            return res.status(200).json({ response: 'Cidade cadastrada!' })
        } catch (error) {
            return res.status(500).json({ error: error })
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
            return res.status(500).json({ error: error })
        }
    },

    async updateCity(req, res){
        try {
            const { id } = req.params
            const { descricao, id_estado } = req.body

            if (!descricao) res.status(400).json({ response: 'Informe a descrição!' })

            const city = await Cidade.findOne({ where: { descricao } })

            if (city && city.id_estado === id_estado) {
                return res.status(400).json({ response: 'Essa descrição está em uso, ou é a igual ao anterior!' })
            }

            await Cidade.update({
                descricao,
                id_estado
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Cidade alterada!' })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    },

    async deleteCity(req, res){
        try {
            const { id } = req.params

            const city = await Cidade.findByPk(id, {
                include: {
                    association: 'clientes'
                }
            })

            if (city.clientes.length >= 1) {
                return res.status(400).send({ error: 'Esta cidade não pode ser deletada, pois possui clientes associados a ela!' })
            }

            await Cidade.destroy({ where: { id } })

            return res.status(200).json({ response: 'Cidade deletada!' })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
}