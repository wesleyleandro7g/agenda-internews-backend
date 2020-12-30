const { Model, DataTypes } = require("sequelize");

class StatusAtendimento extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'status_atendimento'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Atendimentos, { foreignKey: 'id_status', as: 'atendimentos' })
  }
}

module.exports = StatusAtendimento;
