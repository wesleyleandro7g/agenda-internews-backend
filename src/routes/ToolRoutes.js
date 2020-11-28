const routes = require("express").Router;
const router = routes();

const ToolController =  require('../controllers/ToolController')

router.post('/create', ToolController.createNewTool)
router.get('/index', ToolController.listAllTools)

module.exports = router