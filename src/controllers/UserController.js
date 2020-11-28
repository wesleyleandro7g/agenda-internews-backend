const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

module.exports = {
    async createNewUser(req, res){
        try {
            const { nome, id_setor, contato, senha } = req.body

            const newPassword = await bcrypt.hash(senha, 10);

            const user = await Usuario.findOne({
                where: {
                    nome
                }
            })

            if(user) return res.status(400).send('Nome de usuário em uso!')

            const newUser = await Usuario.create({
                nome,
                id_setor,
                contato,
                senha: newPassword
            })

            return res.status(200).json(newUser)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },

    async listAllUsers(req, res){
        try {
            const users = await Usuario.findAll({
                include: {
                    association: 'setor'
                }
            })

            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}