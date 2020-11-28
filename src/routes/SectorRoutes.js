const routes = require("express").Router;
const router = routes();

const SectorController =  require('../controllers/SectorController')

router.get('/index', SectorController.listAllSectors)

module.exports = router