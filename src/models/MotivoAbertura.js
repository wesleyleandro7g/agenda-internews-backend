const { Model, DataTypes } = require("sequelize");

class MotivoAbertura extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'motivo_abertura'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Atendimentos, { foreignKey: 'id_abertura', as: 'atendimentos' })
  }
}

module.exports = MotivoAbertura;
