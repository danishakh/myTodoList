const router = require("express").Router();
const todoRoutes = require("./todos");

// Todo routes
router.use("/todos", todoRoutes);

module.exports = router;