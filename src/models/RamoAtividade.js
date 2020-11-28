const { Model, DataTypes } = require("sequelize");

class RamoAtividade extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'ramo_atividade'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Clientes, { foreignKey: 'id_atividade', as: 'clientes' })
  }
}

module.exports = RamoAtividade;
