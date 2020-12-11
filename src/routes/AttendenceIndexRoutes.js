const routes = require("express").Router;
const router = routes();

const AttendanceIndexController =  require('../controllers/AttendanceIndexController')

router.get('/index', AttendanceIndexController.listAllAttendences)
router.get('/support', AttendanceIndexController.listSupportAttendences)
router.get('/support-closed', AttendanceIndexController.listSupportClosedAttendences)
router.get('/client/:id_cliente', AttendanceIndexController.listClientAttendences)


module.exports = router