const Suporte = require('../models/Suporte')

module.exports = {
    async createNewSupport(req, res){
        try {
            const { nome, id_usuario } = req.body

            if (!nome || !id_usuario) return res.status(400).json({ response: 'Dados incompletos!' })

            const [ support, created ] = await Suporte.findOrCreate({
                where: {
                    nome
                },
                defaults: {
                    nome,
                    id_usuario
                }
            })

            if(!created) return res.status(400).json({ response: `O nome '${support.nome}' já está em uso!` })

            return res.status(200).json({ response: 'Suporte cadastrado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllSupports(req, res){
        try {
            const supports = await Suporte.findAll({
                include: {
                    association: 'usuario'
                }
            })

            return res.status(200).json(supports)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async updateSupport(req, res){
        try {
            const { id } = req.params
            const { nome, id_usuario } = req.body

            if (!nome || !id_usuario) return res.status(400).json({ response: 'Dados incompletos!' })

            const support = await Suporte.findOne({ where: { nome } })

            if (support && support.id_usuario === id_usuario) {
                return res.status(400).json({ response: 'Esse nome está em uso, ou é a igual ao anterior!' })
            }

            await Suporte.update({
                nome,
                id_usuario
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Usuário alterado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async deleteSupport(req, res){
        try {
            const { id } = req.params

            const support = await Suporte.findByPk(id, {
                include: {
                    association: 'clientes'
                }
            })

            if (support.clientes.length >= 1) {
                return res.status(400).send({ error: 'Este suporte não pode ser deletada, pois possui clientes associados a ele!' })
            }

            await Suporte.destroy({
                where: {
                    id
                }
            })

            return res.status(200).json({ response: 'Suporte deletado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}