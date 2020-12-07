"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "modulos",
      [
        {
          descricao: "STANDARD",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "NORMAL",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "INTERMEDIÁRIO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AVANÇADO",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("modulos", null, {});
  },
};
