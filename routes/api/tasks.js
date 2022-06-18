const express = require('express');
const router =  express.Router();
const auth = require('../../middleware/auth');

//Task model
const Task = require('../../models/Task');

//Get all task
router.get('/',(req, res) => {
    Task.find()
    .sort({ date: -1 })
    .then(tasks => res.json(tasks))
});

//Create Task
router.post('/',auth,(req, res) => {
    const newTask = new Task({
        name: req.body.name,
        subject: req.body.subject,
        task: req.body.task
    });

    newTask.save().then(task => res.json(task));
});

// Delete a task

router.delete('/:id',auth,(req, res) => {
    Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;