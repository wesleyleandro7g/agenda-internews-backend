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
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantidade_acessos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantidade_empresas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantidade_bancos: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      identificador_servidor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      identificador_internews: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vencimento_mensalidade: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mensalidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      versao_internews: {
        type: Sequelize.STRING,
        allowNull: true,
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
