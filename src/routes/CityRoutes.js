const routes = require("express").Router;
const router = routes();

const CityController =  require('../controllers/CityController')

router.post('/create', CityController.createNewCity)
router.get('/index', CityController.listAllCities)
router.put('/update/:id', CityController.updateCity)
router.delete('/delete/:id', CityController.deleteCity)

module.exports = router