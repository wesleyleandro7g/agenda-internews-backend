const routes = require("express").Router;
const router = routes();

const AttendanceUpdateController =  require('../controllers/AttendanceUpdateController')

router.post('/create', AttendanceUpdateController.createNewAttendance)
router.put('/repass', AttendanceUpdateController.repassAttendence)
router.put('/open', AttendanceUpdateController.openAttendence)
router.put('/close', AttendanceUpdateController.closeAttendence)

module.exports = router