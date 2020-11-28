const routes = require("express").Router;
const router = routes();

const ModuleController =  require('../controllers/ModuleController')

router.get('/index', ModuleController.listAllModules)

module.exports = router