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
    this.belongsToMany(models.Atendimentos, { foreignKey: 'id_motivo', through: 'motivo_fech_atend', as: 'atendimentos' })
  }
}

module.exports = MotivoFechamento;
