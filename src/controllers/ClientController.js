const Cliente = require('../models/Clientes')

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
                id_cidade,
                id_modulo,
                id_suporte
            } = req.body

            const client = await Cliente.findOne({
                where: {
                    cnpj
                }
            })

            if(client) return res.status(400).send('Cliente já cadastrado!')

            const newClient = await Cliente.create({
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
                id_cidade,
                id_modulo,
                id_suporte
             })

            return res.status(200).json(newClient)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllClients(req, res){
        try {
            const clients = await Cliente.findAll({
                include: [
                    { association: 'cidade' },
                    { association: 'atividade' },
                    { association: 'modulo' },
                    { association: 'suporte' },
                ]
            })

            return res.status(200).json(clients)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}