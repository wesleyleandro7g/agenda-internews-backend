const { Model, DataTypes } = require("sequelize");

class Clientes extends Model {
  static init(sequelize) {
    super.init(
      {
        razao_social: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        endereco: DataTypes.STRING,
        quantidade_acessos: DataTypes.INTEGER,
        quantidade_empresas: DataTypes.INTEGER,
        quantidade_bancos: DataTypes.INTEGER,
        identificador_servidor: DataTypes.STRING,
        identificador_internews: DataTypes.STRING,
        mensalidade: DataTypes.INTEGER,
        id_atividade: DataTypes.INTEGER,
        id_estado: DataTypes.INTEGER,
        id_cidade: DataTypes.INTEGER,
        id_modulo: DataTypes.INTEGER,
        id_suporte: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'clientes'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Ferramentas, { foreignKey: 'id_cliente', through: 'ferramenta_cliente', as: 'ferramenta' }),
    this.hasOne(models.Estados, { foreignKey: 'id_estado', as: 'estado' }),
    this.hasOne(models.Cidades, { foreignKey: 'id_cidade', as: 'cidade' }),
    this.hasOne(models.RamoAtividade, { foreignKey: 'id_atividade', as: 'atividade' }),
    this.hasOne(models.Modulos, { foreignKey: 'id_modulo', as: 'modulo' }),
    this.hasOne(models.Suporte, { foreignKey: 'id_suporte', as: 'suporte' })
  }
}

module.exports = Clientes;
