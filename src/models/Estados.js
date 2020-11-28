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
    this.hasMany(models.Clientes, { foreignKey: 'id_estado', as: 'clientes' })
  }
}

module.exports = Estados;
