const { Model, DataTypes } = require("sequelize");

class Estados extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'estados'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Cliente, { foreignKey: 'id_estado', as: 'cliente' })
  }
}

module.exports = Estados;
