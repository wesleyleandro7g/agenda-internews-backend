require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/Usuario");

const JWT = require("../config/JWT");

module.exports = {
  async userAuthenticate(req, res) {
    console.log(req.body)
    try {
      const { descricao, senha } = req.body;

      if (!descricao || !senha)
        return res.status(400).send({ error: "Dados incompletos" });

      const user = await User.findOne({
        where: {
          descricao
        }, include: [
          {
            association: 'setor'
          },
          {
            association: 'suporte'
          }
        ]});

      if (!user)
        return res.status(404).send({ error: "Usuário não encontrado" });

      console.log(user)

      const pass = await bcrypt.compare(senha, user.dataValues.senha);

      if (!pass) return res.status(401).send({ error: "Senha invalida" });

      const payload = {
        userID: user.dataValues.id,
        userName: user.dataValues.descricao,
        sectorID: user.dataValues.setor.id,
        sectorName: user.dataValues.setor.descricao,
        supportID: user.dataValues.suporte ? user.dataValues.suporte.id : null,
        supportName: user.dataValues.suporte ? user.dataValues.suporte.descricao : null
      };

      const newToken = await JWT.generate(payload, process.env.AUTH_USER || '0a3ccfe0f3385d22f6ca450f00a4d97e', 8400);

      return res.status(200).json({ token: newToken, payload: payload });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  async tokenVerify(req, res) {
    const authHeader = req.headers.authorization;

    const decoded = await JWT.verify(res, authHeader, process.env.AUTH_USER || '0a3ccfe0f3385d22f6ca450f00a4d97e');

    return res.status(200).send(decoded);
  },
};
