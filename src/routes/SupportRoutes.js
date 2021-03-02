const routes = require("express").Router;
const router = routes();

const SupportController =  require('../controllers/SupportController')

router.post('/create', SupportController.createNewSupport)
router.get('/index', SupportController.listAllSupports)
router.put('/update/:id', SupportController.updateSupport)
router.delete('/delete/:id', SupportController.deleteSupport)

module.exports = router