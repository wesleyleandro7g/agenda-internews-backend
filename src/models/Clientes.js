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
        mensalidade: DataTypes.STRING,
        id_atividade: DataTypes.INTEGER,
        id_atividade_interna: DataTypes.INTEGER,
        id_cidade: DataTypes.INTEGER,
        id_modulo: DataTypes.INTEGER,
        id_suporte: DataTypes.INTEGER,
        versao_internews: DataTypes.STRING,
        vencimento_mensalidade: DataTypes.STRING
      },
      {
        sequelize,
        tableName: 'clientes'
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Ferramentas, { foreignKey: 'id_cliente', through: 'ferramenta_cliente', as: 'ferramentas' }),
    this.belongsTo(models.Cidades, { foreignKey: 'id_cidade', as: 'cidade' }),
    this.belongsTo(models.RamoAtividade, { foreignKey: 'id_atividade', as: 'atividade' }),
    this.belongsTo(models.AtividadeInterna, { foreignKey: 'id_atividade_interna', as: 'atividade_interna' }),
    this.belongsTo(models.Modulos, { foreignKey: 'id_modulo', as: 'modulo' }),
    this.belongsTo(models.Suporte, { foreignKey: 'id_suporte', as: 'suporte' }),
    this.hasMany(models.Atendimentos, { foreignKey: 'id_cliente', as: 'atendimento' })
  }
}

module.exports = Clientes;
