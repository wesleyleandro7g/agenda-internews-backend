const routes = require("express").Router;
const router = routes();

const CityController =  require('../controllers/CityController')

router.post('/create', CityController.createNewCity)
router.get('/index', CityController.listAllCities)

module.exports = router