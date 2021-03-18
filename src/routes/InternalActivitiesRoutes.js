const routes = require("express").Router;
const router = routes();

const InternalActiviteController =  require('../controllers/InternalActiviteController')

router.post('/create', InternalActiviteController.createNewActivity)
router.get('/index', InternalActiviteController.listAllActivities)
router.put('/update/:id', InternalActiviteController.updateActivitie)
router.delete('/delete/:id', InternalActiviteController.deleteActivitie)

module.exports = router