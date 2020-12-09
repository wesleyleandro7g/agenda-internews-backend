const routes = require("express").Router;
const router = routes();

const ToolController =  require('../controllers/ToolController')

router.post('/create', ToolController.createNewTool)
router.get('/index', ToolController.listAllTools)
router.post('/new-client-tool', ToolController.registerClientTools)

module.exports = router