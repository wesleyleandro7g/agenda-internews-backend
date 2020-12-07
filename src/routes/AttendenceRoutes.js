const routes = require("express").Router;
const router = routes();

const AttendanceController =  require('../controllers/AttendanceController')

router.post('/create', AttendanceController.createNewAttendance)
router.get('/index', AttendanceController.listAllAttendences)
router.get('/support', AttendanceController.listSupportAttendences)
router.put('/repass', AttendanceController.repassAttendence)

module.exports = router