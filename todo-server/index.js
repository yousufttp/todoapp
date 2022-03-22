const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskModel = require('./model/task');
const db  = require('./src/db');

const port = 3003; 

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Node Server is running on', port)
});

app.use(function(req, res,  next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

app.get('/getAll', async(req, res)=> {
    const tasks = await taskModel.find({});
    try {
        res.send(tasks);
    } catch (error) {
        res.sendStatus(500).send(error);
    }
})

app.post('/addTodo', async (req, res)=> {
    const todo = new taskModel(req.body);
    try {
        await todo.save();
        res.send(todo);
    } catch (error) {
        res.sendStatus(500).send(error);
    }
})

app.put('/setAsDone', (req, res)=> {
    taskModel.findOneAndUpdate({'_id': req.body._id}, {'status': 1}, {new : true} ).then(doc =>{
        res.send(200);
    }).catch(error =>{
        res.sendStatus(500).error(error)
    })
})

app.delete('/remove', (req, res) => {
    taskModel.findOneAndRemove({'_id': req.body._id})
    .then(result => {
        res.send(200)
    })
    .catch(err => {
        res.sendStatus(500).send(err)
    })
})