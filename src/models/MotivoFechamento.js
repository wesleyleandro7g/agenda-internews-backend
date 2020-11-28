const { Model, DataTypes } = require("sequelize");

class MotivoFechamento extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'motivo_fechamento'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Atendimentos, { foreignKey: 'id_fechamento', as: 'atendimentos' })
  }
}

module.exports = MotivoFechamento;
