const { Model, DataTypes } = require("sequelize");

class AtividadeInterna extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'atividade_interna'
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Clientes, { foreignKey: 'id_atividade_interna', as: 'clientes' })
  }
}

module.exports = AtividadeInterna;
