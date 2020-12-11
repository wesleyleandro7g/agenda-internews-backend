const routes = require("express").Router;
const router = routes();

const InternalActiviteController =  require('../controllers/InternalActiviteController')

router.post('/create', InternalActiviteController.createNewActivity)
router.get('/index', InternalActiviteController.listAllActivities)

module.exports = router