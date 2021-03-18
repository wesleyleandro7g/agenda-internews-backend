const routes = require("express").Router;
const router = routes();

const DashboardController =  require('../controllers/DashboardController')

router.get('/activities/:id_suporte', DashboardController.clientsForInternalActivities)
router.get('/industries/:id_suporte', DashboardController.clientsForIndustries)
router.get('/cities/:id_suporte', DashboardController.clientsForCities)
router.get('/attendences/:id_suporte', DashboardController.attendencesForType)
router.get('/attendences-month/:id_suporte', DashboardController.attendencesForMonth)

module.exports = router