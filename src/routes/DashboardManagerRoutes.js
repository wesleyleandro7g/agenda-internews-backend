const routes = require("express").Router;
const router = routes();

const DashboardController =  require('../controllers/DashboardManagerController')

router.get('/activities', DashboardController.clientsForInternalActivities)
router.get('/industries', DashboardController.clientsForIndustries)
router.get('/cities', DashboardController.clientsForCities)
router.get('/attendences', DashboardController.attendencesForType)
router.get('/attendences-month', DashboardController.attendencesForMonth)

module.exports = router