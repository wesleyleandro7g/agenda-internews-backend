"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "modulos",
      [
        {
          descricao: "Standard",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "Normal",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "Intermediário",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "Avançado",
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
