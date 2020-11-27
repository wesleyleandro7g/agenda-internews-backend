const http = require('http')
const routes = require('./Routes')

require("./database");

const PORT = process.env.PORT || 3333

const server = http.createServer(routes)

server.listen(PORT)