const Cliente = require('../models/Clientes')
const Suporte = require('../models/Suporte')

module.exports = {
	async createNewClient(req, res){
		try {
			const {
				nome,
				cnpj,
				cpf,
				endereco,
				quantidade_acessos,
				quantidade_empresas,
				quantidade_bancos,
				identificador_servidor,
				identificador_internews,
				mensalidade,
				id_atividade,
				id_atividade_interna,
				id_cidade,
				id_modulo,
				id_suporte,
				versao_internews,
				vencimento_mensalidade
			} = req.body
			
			const client = await Cliente.findOne({
				where: {
					cnpj
				}
			})
			
			if(client) return res.status(200).json({ message: 'Cliente já cadastrado!' })
			
			await Cliente.create({
				nome,
				cnpj,
				cpf,
				endereco,
				quantidade_acessos,
				quantidade_empresas,
				quantidade_bancos,
				identificador_servidor,
				identificador_internews,
				mensalidade,
				id_atividade,
				id_atividade_interna,
				id_cidade,
				id_modulo,
				id_suporte,
				versao_internews,
				vencimento_mensalidade
			})
			
			return res.status(200).json({ message: 'Cliente cadastrado!' })
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	},
	
	async listAllClients(req, res){
		try {
			const { count, rows: clients } = await Cliente.findAndCountAll({
				include: [
					{ association: 'cidade' },
					{ association: 'atividade' },
					{ association: 'modulo' },
					{ association: 'suporte' },
					{ association: 'ferramentas' }
				],
				order: [
					['nome', 'ASC']
				]
			})
			
			return res.status(200).json({ clients, count })
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	},
	
	async listAllClientsSupport(req, res){
		try {
			const { id_usuario } = req.headers
			
			const suporte = await Suporte.findOne({
				where: {
					id_usuario
				}
			})
			
			if(!suporte) return res.status(404).send('Suporte não encontrado!')
			
			const { count, rows: clients } = await Cliente.findAndCountAll({
				include: [
					{ association: 'cidade' },
					{ association: 'atividade' },
					{ association: 'atividade_interna' },
					{ association: 'modulo' },
					{ association: 'suporte' },
					{ association: 'ferramentas' }
				],
				where: {
					id_suporte: suporte.id
				}
			})
			
			return res.status(200).json({ clients, count })
		} catch (error) {
			return res.status(500).json({ error: error });
		}
	},
	
	async updateClient(req, res){
		try {
			const {
				nome,
				cnpj,
				cpf,
				endereco,
				quantidade_acessos,
				quantidade_empresas,
				quantidade_bancos,
				identificador_servidor,
				identificador_internews,
				mensalidade,
				id_atividade,
				id_atividade_interna,
				id_cidade,
				id_modulo,
				id_suporte,
				versao_internews,
				vencimento_mensalidade
			} = req.body
			
			const client = await Cliente.findOne({
				where: {
					cnpj
				}
			})
			
			if(!client) return res.status(200).json({ message: 'Cliente não encontrado!' })
			
			await Cliente.update({
				nome,
				cnpj,
				cpf,
				endereco,
				quantidade_acessos,
				quantidade_empresas,
				quantidade_bancos,
				identificador_servidor,
				identificador_internews,
				mensalidade,
				id_atividade,
				id_atividade_interna,
				id_cidade,
				id_modulo,
				id_suporte,
				versao_internews,
				vencimento_mensalidade
			}, {
				where: {
					cnpj
				}
			})
			
			return res.status(200).json({ message: 'Cliente alterado!' })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ error: error });
		}
	},
}