const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    task: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        required: true,
        default: "todo",
    },

    image_id: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
