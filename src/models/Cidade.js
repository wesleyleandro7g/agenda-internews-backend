const { Model, DataTypes } = require("sequelize");

class Cidades extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'cidades'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Clientes, { foreignKey: 'id_cidade', as: 'clientes' })
  }
}

module.exports = Cidades;
