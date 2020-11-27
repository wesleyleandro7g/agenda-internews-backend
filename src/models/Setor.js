const { Model, DataTypes } = require("sequelize");

class Setores extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'setores'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Usuarios, { foreignKey: 'id_setor', as: 'usuario' })
  }
}

module.exports = Setores;
