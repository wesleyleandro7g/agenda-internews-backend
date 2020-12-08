"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "status_atendimento",
      [
        {
          descricao: "ABERTO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AGUARDANDO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AGENDADO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "FINALIZADO",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("status_atendimento", null, {});
  },
};
