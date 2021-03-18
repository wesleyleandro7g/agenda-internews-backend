"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("atendimentos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_solicitante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contato_solicitante: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cliente_solicitou: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      reagendado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      data_agendamento: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      hora_agendamento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      versao_internews: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao_atendimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nome_atendente: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: { model: 'clientes', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_abertura: {
        type: Sequelize.INTEGER,
        references: { model: 'motivo_abertura', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        allowNull: true
      },
      id_fechamento: {
        type: Sequelize.INTEGER,
        references: { model: 'motivo_fechamento', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        allowNull: true
      },
      id_suporte: {
        type: Sequelize.INTEGER,
        references: { model: 'suportes', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        allowNull: true
      },
      id_setor: {
        type: Sequelize.INTEGER,
        references: { model: 'setores', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      id_status: {
        type: Sequelize.INTEGER,
        references: { model: 'status_atendimento', key: 'id' },
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
    await queryInterface.dropTable("atendimentos");
  },
};
