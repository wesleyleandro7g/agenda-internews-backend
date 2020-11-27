const { Model, DataTypes } = require("sequelize");

class Cidades extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'cidade'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Cliente, { foreignKey: 'id_cidade', as: 'cliente' })
  }
}

module.exports = Cidades;
