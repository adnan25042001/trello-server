const mongoose = require("mongoose");
const Schema = mongoose.schema;

const todoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    task: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        required: true,
        default: "todo",
    },

    image_id: {
        type: String,
    },
});

const Todo = mongoose.model("User", todoSchema);

module.exports = Todo;
