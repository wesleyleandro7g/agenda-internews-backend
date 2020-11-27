const routes = require("express").Router;
const router = routes();

const UserController =  require('../controllers/UserController')

router.get('/create', UserController.createNewUser)

module.exports = router