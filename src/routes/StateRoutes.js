const routes = require("express").Router;
const router = routes();

const StateController =  require('../controllers/StateController')

router.get('/index', StateController.listAllStates)

module.exports = router