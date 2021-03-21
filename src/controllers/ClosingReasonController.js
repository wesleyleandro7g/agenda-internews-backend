const MotivoFechamento = require('../models/MotivoFechamento')
const MotivoFechAtend = require('../models/MotivoFechAtend')

module.exports = {
	async createNewClosingReason(req, res){
		try {
			const { descricao } = req.body
			
			const [ reason, created ] = await MotivoFechamento.findOrCreate({
				where: {
					descricao
				},
				defaults: {
					descricao
				}
			})
			
			if(!created) return res.status(200).json({ message: `Motivo de fechamento '${reason.descricao}' já cadastrado!` })
			
			return res.status(200).json({ message: 'Motivo cadastrado!' })
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	},
	
	async listAllClosingReasons(req, res){
		try {
			const reason = await MotivoFechamento.findAll()
			
			return res.status(200).json(reason)
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	},
	
	async updateClosingReason(req, res){
		try {
			const { id } =  req.params
			const { descricao } = req.body
			
			const closing = await MotivoFechamento.findByPk(id, {
				include: {
					association: 'atendimentos'
				}
			})
			
			if (closing.atendimentos.length >= 1) {
				return res.status(200).json({ message: 'Não é possível alterar este motivo, pois o mesmo já possui atendimentos criados!' })
			}
			
			const reasonExist = await MotivoFechamento.findOne({
				where: {
					descricao
				}
			})
			
			if (reasonExist) {
				return res.status(200).json({ message: 'Descrição em uso ou igual a anterior!' })
			}
			
			await MotivoFechamento.update({
				descricao
			}, {
				where: {
					id
				}
			})
			
			return res.status(200).json({ message: 'Motivo alterado!' })
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	},
	
	async listDetailsClosingReason(req, res){
		try {
			const reason = await MotivoFechAtend.findAll()
			
			return res.status(200).json(reason)
		} catch (error) {
			return res.status(500).json({ error: error })
		}
	}
}