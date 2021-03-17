const { Model, DataTypes } = require("sequelize");

class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
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
    this.belongsTo(models.Setores, { foreignKey: 'id_setor', as: 'setor' }),
    this.hasMany(models.Atendimentos, { foreignKey: 'id_usuario', as: 'atendimentos' }),
    this.hasOne(models.Suporte, { foreignKey: 'id_usuario', as: 'suporte' })
  }
}

module.exports = Usuarios;
