var express = require('express');
var mongoJs = require('mongojs');
var router = express.Router();
var db = mongoJs('mongodb://admin:password@ds135669.mlab.com:35669/mytasklistc0w', ['tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next)
{
    db.tasks.find(function(err, tasks)
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(tasks);
        }
    });
});

// Get Single Tasks
router.get('/task/:id', function(req, res, next)
{
    db.tasks.findOne({_id: mongoJs.ObjectId(req.params.id)},function(err, task)
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(task);
        }
    });
});

// Save Tasks; handle POST request
router.post('/task', function(req, res, next)
{
    var task = req.body;
    if (!task.title || (task.isDone + ''))
    {
        res.status(400);
        res.json(
            {
                "error" : "Bad data"
            }
        )
    }
    else
    {
        db.tasks.save(task, function(err, task)
        {
            if (err)
            {
                res.send(err);
            }
            else
            {
                res.json(task);
            }
        });
    }
});

// Delete Tasks
router.delete('/task/:id', function(req, res, next)
{
    db.tasks.remove({_id: mongoJs.ObjectId(req.params.id)},function(err, task)
    {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(task);
        }
    });
});

// Update Task
router.put('/task/:id', function(req, res, next)
{
    var task = req.body;
    var updateTask = {};

    if (task.isDone)
    {
        updateTask.isDone = task.isDone;
    }

    if (task.title)
    {
        updateTask.title = task.title;
    }

    if (!updateTask)
    {
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else
    {
        db.tasks.update({_id: mongoJs.ObjectId(req.params.id)}, updateTask, {}, function(err, task)
        {
            if (err)
            {
                res.send(err);
            }
            else
            {
                res.json(task);
            }
        });
    }
    
});

module.exports = router; 