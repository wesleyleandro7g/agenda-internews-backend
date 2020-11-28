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
    this.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'usuario' }),
    this.hasMany(models.Atendimentos, { foreignKey: 'id_suporte', as: 'atendimento' })
  }
}

module.exports = Suporte;
