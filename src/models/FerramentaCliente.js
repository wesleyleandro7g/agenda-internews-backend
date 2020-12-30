const { Model, DataTypes } = require("sequelize");

class FerramentaCliente extends Model {
  static init(sequelize) {
    super.init(
      {
        id_ferramenta: DataTypes.INTEGER,
        id_cliente: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: 'ferramenta_cliente'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Clientes, { foreignKey: 'id_ferramenta', as: 'clientes' }),
    this.belongsTo(models.Ferramentas, { foreignKey: 'id_cliente', as: 'ferramentas' })
  }
}

module.exports = FerramentaCliente;
