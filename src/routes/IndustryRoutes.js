const routes = require("express").Router;
const router = routes();

const IndustryController =  require('../controllers/IndustryController')

router.post('/create', IndustryController.createNewIndustry)
router.get('/index', IndustryController.listAllIndustries)
router.put('/update/:id', IndustryController.updateIndustrie)
router.delete('/delete/:id', IndustryController.deleteIndustrie)

module.exports = router