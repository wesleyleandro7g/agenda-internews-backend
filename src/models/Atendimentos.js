const { Model, DataTypes } = require("sequelize");

class Atendimentos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_solicitante: DataTypes.STRING,
        contato_solicitante: DataTypes.STRING,
        cliente_solicitou: DataTypes.BOOLEAN,
        reagendado: DataTypes.BOOLEAN,
        data_agendamento: DataTypes.DATE,
        hora_agendamento: DataTypes.STRING,
        id_status: DataTypes.STRING,
        id_cliente: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
        id_abertura: DataTypes.INTEGER,
        id_fechamento: DataTypes.INTEGER,
        id_suporte: DataTypes.INTEGER,
        id_setor: DataTypes.INTEGER,
        versao_internews: DataTypes.STRING,
        nome_atendente: DataTypes.STRING,
        descricao_atendimento: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'atendimentos'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Clientes, { foreignKey: 'id_cliente', as: 'cliente' }),
    this.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'usuario' }),
    this.belongsTo(models.MotivoAbertura, { foreignKey: 'id_abertura', as: 'abertura' }),
    this.belongsTo(models.Suporte, { foreignKey: 'id_suporte', as: 'suporte' }),
    this.belongsTo(models.Setores, { foreignKey: 'id_setor', as: 'setor' }),
    this.belongsTo(models.StatusAtendimento, { foreignKey: 'id_status', as: 'status' }),
    this.belongsToMany(models.MotivoFechamento, { foreignKey: 'id_atendimento', through: 'motivo_fech_atend', as: 'fechamento' })
  }
}

module.exports = Atendimentos;
