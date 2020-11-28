const { Model, DataTypes } = require("sequelize");

class Ferramentas extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'ferramentas'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Clientes, { foreignKey: 'id_ferramenta', through: 'ferramenta_cliente', as: 'clientes' })
  }
}

module.exports = Ferramentas;
