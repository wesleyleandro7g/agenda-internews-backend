const routes = require("express").Router;
const router = routes();

const ClientController =  require('../controllers/ClientController')

router.post('/create', ClientController.createNewClient)
router.get('/index', ClientController.listAllClients)

module.exports = router