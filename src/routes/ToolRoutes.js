const routes = require("express").Router;
const router = routes();

const ToolController =  require('../controllers/ToolController')

router.post('/create', ToolController.createNewTool)
router.get('/index', ToolController.listAllTools)
router.get('/list-client-tools/:id_cliente', ToolController.listClientTools)
router.post('/new-client-tool', ToolController.registerClientTools)
router.delete('/remove-client-tool', ToolController.removeClientTools)

module.exports = router