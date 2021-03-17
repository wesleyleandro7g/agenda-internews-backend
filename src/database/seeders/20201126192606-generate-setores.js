"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "setores",
      [
        {
          descricao: "ADMINISTRATIVO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "ONLINE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "INTERNO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "EXTERNO",
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
