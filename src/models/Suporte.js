const { Model, DataTypes } = require("sequelize");

class Suporte extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'suportes'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'usuario' })
  }
}

module.exports = Suporte;
