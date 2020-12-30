"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "setores",
      [
        {
          nome: "ADMINISTRATIVO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "ONLINE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "INTERNO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "EXTERNO",
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
