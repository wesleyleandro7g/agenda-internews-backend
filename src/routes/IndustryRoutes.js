const routes = require("express").Router;
const router = routes();

const IndustryController =  require('../controllers/IndustryController')

router.post('/create', IndustryController.createNewIndustry)
router.get('/index', IndustryController.listAllIndustries)

module.exports = router