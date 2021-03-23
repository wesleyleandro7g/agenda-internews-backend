const routes = require("express").Router;
const router = routes();

const ReportController =  require('../controllers/ReportAttendences')

router.get('/index', ReportController.unattendedCostumer)
router.get('/support', ReportController.unattendedCostumerPerSupport)

module.exports = router