const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { userRight, createTodo } = require('./types');
const bcrypt = require('bcrypt');
const { Users, Todos } = require('./models/Users');
const { JWT_SECRET } = require('./config');
const userAuthentication = require('./middleware/userAuthentication');
// const Todos = require('./models/Todos');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1/TodoApp');

// body -> username,password,full name,email id
app.post('/signup', async(req,res) => {
    const createPayload = req.body;
    const parsedPayload = userRight.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            message: "Wrong inputs given"
        });
        return;
    }

    const newUser = parsedPayload.data;
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(newUser.password, salt);
    await Users.create({
        username: newUser.username,
        password: newpassword,
        fullName: newUser.fullName,
        email: newUser.email
    });

    res.json("User created successfully");
    
});

app.post('/signin', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = Users.find({
        username,
        password
    })
    if(user){
        const jwtToken = jwt.sign({username},JWT_SECRET);
        res.json({jwtToken});
    }
    else{
        res.status(403).json({
            message: "You are not authorised"
        })
    }
});

app.post('/todo',userAuthentication, async(req,res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            message: "Wrong inputs given"
        });
        return;
    }

    const todo = parsedPayload.data;
    // console.log(todo);

    try{
        const user = await Users.findOne({ username: req.username }).exec();
        if (!user) {
            console.log("User not found");
            // Handle the error, e.g., return an error response
            return res.status(404).send("User not found");
        }
        // console.log(user._id.toString());

        const newTodo = new Todos({
            ...todo,
            userid: user._id.toString()
        });

        // console.log(newTodo);
        
        await newTodo.save();
        res.status(201).json({
            message: "Todo created"
        })
    }
    catch{
        res.status(500).json({
            message: "An error occured while creating todo"
        });
    }
    
});

app.get('/todos',userAuthentication, async(req,res) => {
    try{
        const user = await Users.findOne({
            username: req.username
        }).exec();
        const todos = await Todos.find({ userid: user._id });
        // console.log("Sent");

        res.status(200).json({
            message: "Todos fetched successfully",
            todos: todos
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the todos",
            error: error.message
        });
    }
});

// body will contain todo id
app.put('/completed',userAuthentication, async(req,res) =>{
    const todoId = req.body.todoid;
    try {
        // Find the todo by ID
        const todo = await Todos.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Toggle the completionStatus
        todo.completionStatus = !todo.completionStatus;

        // Save the updated todo
        const updatedTodo = await todo.save();

        res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the todo",
            error: error.message
        });
    }

});

app.listen(4000, function(){
    console.log("Connected to the server");
})