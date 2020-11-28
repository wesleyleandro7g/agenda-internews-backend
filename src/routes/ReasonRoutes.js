const routes = require("express").Router;
const router = routes();

const OpeningReasonController =  require('../controllers/OpeningReasonController')
const ClosingReasonController =  require('../controllers/ClosingReasonController')

router.post('/opening/create', OpeningReasonController.createNewOpeningReason)
router.get('/opening/index', OpeningReasonController.listAllOpeningReasons)

router.post('/closing/create', ClosingReasonController.createNewClosingReason)
router.get('/closing/index', ClosingReasonController.listAllClosingReasons)

module.exports = router