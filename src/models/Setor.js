const { Model, DataTypes } = require("sequelize");

class Setores extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'setores'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Usuarios, { foreignKey: 'id_setor', as: 'usuarios' }),
    this.hasMany(models.Atendimentos, { foreignKey: 'id_setor', as: 'atendimento' })
  }
}

module.exports = Setores;
