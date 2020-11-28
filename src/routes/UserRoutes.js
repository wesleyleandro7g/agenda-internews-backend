const routes = require("express").Router;
const router = routes();

const UserController =  require('../controllers/UserController')

router.post('/create', UserController.createNewUser)
router.get('/index', UserController.listAllUsers)

module.exports = router