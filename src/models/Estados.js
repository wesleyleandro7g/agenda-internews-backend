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
    this.hasMany(models.Cidades, { foreignKey: 'id_estado', as: 'cidades' })
  }
}

module.exports = Estados;
