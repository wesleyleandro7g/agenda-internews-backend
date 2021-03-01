const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

module.exports = {
    async createNewUser(req, res){
        try {
            const { nome, id_setor, contato, senha } = req.body

            if (!nome || !id_setor || !senha) return res.status(400).json({ response: 'Dados incompletos!' })

            const newPassword = await bcrypt.hash(senha, 10);

            const user = await Usuario.findOne({
                where: {
                    nome
                }
            })

            if(user) return res.status(400).json({ response: 'Já existe um usuário com esse nome!' })

            await Usuario.create({
                nome,
                id_setor,
                contato,
                senha: newPassword
            })

            return res.status(200).json({ response: 'Usuário cadastro!' })
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllUsers(req, res){
        try {
            const users = await Usuario.findAll({
                include: [
                    {
                        association: 'setor'
                    },
                    {
                        association: 'suporte'
                    }
                ]
            })

            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}