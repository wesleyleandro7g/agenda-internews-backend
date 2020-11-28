"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_setor: {
        type: Sequelize.INTEGER,
        references: { model: 'setores', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        allowNull: false,
      },
      contato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuarios");
  },
};
