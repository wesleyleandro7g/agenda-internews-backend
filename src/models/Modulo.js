const { Model, DataTypes } = require("sequelize");

class Modulos extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'modulos'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Cliente, { foreignKey: 'id_modulo', as: 'cliente' })
  }
}

module.exports = Modulos;
