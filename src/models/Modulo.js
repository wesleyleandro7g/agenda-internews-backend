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
    this.hasMany(models.Clientes, { foreignKey: 'id_modulo', as: 'clientes' })
  }
}

module.exports = Modulos;
