const routes = require("express").Router;
const router = routes();

const SupportController =  require('../controllers/SupportController')

router.post('/create', SupportController.createNewSupport)
router.get('/index', SupportController.listAllSupports)

module.exports = router