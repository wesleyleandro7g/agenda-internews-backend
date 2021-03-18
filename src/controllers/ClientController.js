const Cliente = require('../models/Clientes')
const Suporte = require('../models/Suporte')

module.exports = {
    async createNewClient(req, res){
        try {
            const {
                razao_social,
                cnpj,
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
                versao_internews
            } = req.body

            const client = await Cliente.findOne({
                where: {
                    cnpj
                }
            })

            if(client) return res.status(200).json({ message: 'Cliente já cadastrado!' })

            await Cliente.create({
                razao_social,
                cnpj,
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
                versao_internews
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
                    ['razao_social', 'ASC']
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

            return res.status(200).json({ clients, count})
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async updateClient(req, res){
        try {
            const {
                razao_social,
                cnpj,
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
                versao_internews
            } = req.body

            const client = await Cliente.findOne({
                where: {
                    cnpj
                }
            })

            if(!client) return res.status(404).send('Cliente não encontrado!')

            const updatedClient = await Cliente.update({
                razao_social,
                cnpj,
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
                versao_internews
             }, {
                 where: {
                    cnpj
                 }
             })

            return res.status(200).json(updatedClient)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    },
}