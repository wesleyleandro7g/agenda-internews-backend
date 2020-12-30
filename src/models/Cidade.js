const { Model, DataTypes } = require("sequelize");

class Cidades extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
        id_estado: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: 'cidades'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Clientes, { foreignKey: 'id_cidade', as: 'clientes' }),
    this.belongsTo(models.Estados, { foreignKey: 'id_estado', as: 'estado' })
  }
}

module.exports = Cidades;
