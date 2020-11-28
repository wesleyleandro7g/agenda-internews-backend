const routes = require("express").Router;
const router = routes();

const AttendanceController =  require('../controllers/AttendanceController')

router.post('/create', AttendanceController.createNewAttendance)
router.get('/index', AttendanceController.listAllAttendences)

module.exports = router