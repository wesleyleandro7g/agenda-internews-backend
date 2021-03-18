"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clientes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade_acessos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_empresas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade_bancos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      identificador_servidor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identificador_internews: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mensalidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      versao_internews: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_atividade: {
        type: Sequelize.INTEGER,
        references: { model: 'ramo_atividade', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_cidade: {
        type: Sequelize.INTEGER,
        references: { model: 'cidades', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_modulo: {
        type: Sequelize.INTEGER,
        references: { model: 'modulos', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_atividade_interna: {
        type: Sequelize.INTEGER,
        references: { model: 'modulos', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_suporte: {
        type: Sequelize.INTEGER,
        references: { model: 'suportes', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable("clientes");
  },
};
