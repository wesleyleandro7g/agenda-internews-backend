"use strict";
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newpassword = await bcrypt.hash(process.env.SUPPORT_PASSWORD || 'suphexa', 10);

    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          descricao: "suporte",
          id_setor: 1,
          contato: null,
          senha: newpassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
