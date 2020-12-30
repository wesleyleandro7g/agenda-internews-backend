const { Model, DataTypes } = require("sequelize");

class MotivoFechAtend extends Model {
  static init(sequelize) {
    super.init(
      {
        id_atendimento: DataTypes.INTEGER,
        id_motivo: DataTypes.INTEGER
        
      },
      {
        sequelize,
        tableName: 'motivo_fech_atend'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Atendimentos, { foreignKey: 'id_atendimento', as: 'atendimentos' }),
    this.belongsTo(models.MotivoFechamento, { foreignKey: 'id_motivo', as: 'fechamento' })
  }
}

module.exports = MotivoFechAtend;
