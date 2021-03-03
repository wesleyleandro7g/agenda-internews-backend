const MotivoAbertura = require('../models/MotivoAbertura')

module.exports = {
    async createNewOpeningReason(req, res){
        try {
            const { descricao } = req.body

            const [ reason, created ] = await MotivoAbertura.findOrCreate({
                where: {
                    descricao
                },
                defaults: {
                    descricao
                }
            })

            if (!created) return res.status(200).json({ message: `Motivo de abertura '${reason.descricao}' já cadastrado!` })

            return res.status(200).json({ message: 'Motivo de abertura cadastrado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllOpeningReasons(req, res){
        try {
            const reason = await MotivoAbertura.findAll()

            return res.status(200).json(reason)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async updateOpeningReason(req, res){
        try {
            const { id } = req.params
            const { descricao } = req.body

            if (!descricao) return res.status(200).json({ message: 'Dados incompletos!' })

            const opening = await MotivoAbertura.findByPk(id, {
                include: {
                    association: 'atendimentos'
                }
            })

            if (opening.atendimentos.length >= 1) {
                return res.status(200).json({ message: 'Não é possível alterar este motivo, pois o mesmo já possui atendimentos criados!' })
            }

            await MotivoAbertura.update({
                descricao
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json({ message: 'Motivo alterado!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}