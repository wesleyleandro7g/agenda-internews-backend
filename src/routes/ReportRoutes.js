const routes = require("express").Router;
const router = routes();

const ReportController =  require('../controllers/ReportAttendences')

router.post('/index', ReportController.allCallsPerPeriod)
router.post('/support', ReportController.callsPerPeriodAndPerSupport)

module.exports = router