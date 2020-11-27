"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "setores",
      [
        {
          nome: "administrativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "online",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "interno",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "externo",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("setores", null, {});
  },
};
