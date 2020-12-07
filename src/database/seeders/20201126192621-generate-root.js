"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const newpassword = await bcrypt.hash("suphexa", 10);

    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nome: "suporte",
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
