const routes = require("express").Router;
const router = routes();

const ReportController =  require('../controllers/ReportAttendences')

router.post('/index', ReportController.unattendedCostumerAll)
router.post('/index-served', ReportController.costumersServedAll)
router.post('/support', ReportController.unattendedCostumerPerSupport)
router.post('/support-served', ReportController.costumersServedPerSupport)

module.exports = router