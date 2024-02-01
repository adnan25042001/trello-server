const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Todo = require("../models/Todo");

router.get("/getall", fetchUser, async (req, res) => {
    try {
        const taskList = await Todo.find({ user: req.user.id });
        res.json({ success: true, todos: taskList });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

router.post(
    "/add",
    fetchUser,
    [
        body("task", "task must be atleast 3 characters").isLength({
            min: 3,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ success: false, errors: errors.array()[0] });
        }

        try {
            const { task, status, image } = req.body;

            const todo = new Todo({
                task,
                status,
                image,
                user: req.user.id,
            });
            const savedTodo = await todo.save();
            res.json({ success: true, todo: savedTodo });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    }
);

router.put("/update/:id", fetchUser, async (req, res) => {
    try {
        const { status } = req.body;
        // const newNote = {};
        // if (title) newNote.title = title;
        // if (description) newNote.description = description;
        // if (tag) newNote.tag = tag;
        // if (color) newNote.color = color;
        // newNote.updatedDate = new Date();
        let todo = await Todo.findById(req.params.id);

        if (!todo)
            res.status(404).json({ success: false, error: "Task Not Found" });

        if (note.user.toString() !== req.user.id) {
            res.status(401).send({
                success: false,
                error: "Permission denied",
            });
        }
        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true }
        );
        res.status(200).json({ success: true, todo: todo });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: "Internal server error",
        });
    }
});

router.delete("/delete/:id", fetchUser, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo)
            res.status(404).json({ success: false, error: "Task Not Found" });
        if (todo.user.toString() !== req.user.id) {
            res.status(401).json({
                success: false,
                error: "Permission denied",
            });
        }
        todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({ Success: true, todo: todo });
    } catch (error) {
        res.status(500).json({ Success: true, error: "Internal server error" });
    }
});

module.exports = router;
