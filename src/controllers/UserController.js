const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

module.exports = {
    async createNewUser(req, res){
        try {
            const { nome, setor, contato, senha } = req.body

            const newPassword = await bcrypt.hash(senha, 10);

            const newUser = await Usuario.create({
                nome,
                id_setor: setor,
                contato,
                senha: newPassword
            })

            return res.status(200).json(newUser)
        } catch (error) {
            return res.status(500).json({ error: error });
        }
        
    }
}