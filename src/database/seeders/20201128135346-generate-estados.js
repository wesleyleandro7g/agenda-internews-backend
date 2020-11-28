"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "estados",
      [
        {
          descricao: "AC",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AL",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AP",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "AM",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "BA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "CE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "ES",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "GO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "MA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "MT",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "MS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "MG",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "PA",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "PB",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "PR",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "PE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "PI",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "RJ",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "RN",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "RS",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "RO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "RR",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "SC",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "SP",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "SE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "TO",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          descricao: "DF",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("estados", null, {});
  },
};
