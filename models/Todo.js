const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	date_created: {
		type: Date,
		default: Date.now
	},
	todo_description: {
		type: String,
		default: "",
		required: "Description is required!",
		trim: true
	},	
	todo_responsible: {
		type: String,
        default: "",
        trim: true
	},
	todo_priority: {
		type: String,
		default: "Low",
		required: true
	},
	todo_completed: {
		type: Boolean,
		default: false
    }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;