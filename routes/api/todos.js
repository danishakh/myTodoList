const router = require("express").Router();
const todosController = require("../../controllers/todosController");


// Matches with '/api/todos'
router
	.route("/")
	.get(todosController.findAll)
	.post(todosController.create);

// Matches with '/api/todos/:id'
router
	.route("/:id")
	.get(todosController.findById)
	.post(todosController.updateOne)
	.delete(todosController.deleteOne);

module.exports = router;