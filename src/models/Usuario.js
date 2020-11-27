const { Model, DataTypes } = require("sequelize");

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        id_setor: DataTypes.INTEGER,
        contato: DataTypes.STRING,
        senha: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'usuarios'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Setores, { foreignKey: 'id_setor', as: 'setor' })
  }
}

module.exports = Usuarios;
