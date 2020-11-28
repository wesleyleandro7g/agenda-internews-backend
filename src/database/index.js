const Sequelize = require('sequelize');
const dbConfig = require('../config/Database');

const Setores = require('../models/Setor')
const Usuario = require('../models/Usuario')
const Suporte = require('../models/Suporte')
const Cliente = require('../models/Clientes')
const Ramo = require('../models/RamoAtividade')
const Modulo = require('../models/Modulo')
const Ferramenta = require('../models/Ferramenta')
const Estado = require('../models/Estados')
const Cidade = require('../models/Cidade')
const Abertura = require('../models/MotivoAbertura')
const Fechamento = require('../models/MotivoFechamento')
const Atendimentos = require('../models/Atendimentos')

const connection = new Sequelize(dbConfig);

Setores.init(connection)
Usuario.init(connection)
Suporte.init(connection)
Cliente.init(connection)
Ramo.init(connection)
Modulo.init(connection)
Ferramenta.init(connection)
Estado.init(connection)
Cidade.init(connection)
Abertura.init(connection)
Fechamento.init(connection)
Atendimentos.init(connection)

Setores.associate(connection.models)
Usuario.associate(connection.models)
Suporte.associate(connection.models)
Cliente.associate(connection.models)
Ramo.associate(connection.models)
Modulo.associate(connection.models)
Ferramenta.associate(connection.models)
Estado.associate(connection.models)
Cidade.associate(connection.models)
Abertura.associate(connection.models)
Fechamento.associate(connection.models)
Atendimentos.associate(connection.models)

module.exports = connection;