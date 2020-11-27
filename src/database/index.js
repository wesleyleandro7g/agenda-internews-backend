const Sequelize = require('sequelize');
const dbConfig = require('../config/Database');

const Setores = require('../models/Setor')
const Usuario = require('../models/Usuario')
const Suporte = require('../models/Suporte')

const connection = new Sequelize(dbConfig);

Setores.init(connection)
Usuario.init(connection)
Suporte.init(connection)

Setores.associate(connection.models)
Usuario.associate(connection.models)
Suporte.associate(connection.models)

module.exports = connection;