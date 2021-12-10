const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const todoModel = ('./models/todoModel');
const bodyParser = require('body-parser');
const todomodel = require('./models/todomodel');



const app = express();
//routes
app.get('/todos/',(req, res)=>{
    res.send('we are in the root folder');
});
// creating a Todo update
app.patch('/todos/todoId', async(req, res)=>{
    try{
  const updateTodo = await todoModel.findOneAndUpdate({_id:req.params.todoId},{$set:{status:req.body.status}});
   res.json({
       date:updateTodo,
       message:"todo successfully updated" 
   });
    }catch(err){
        res.json({message:err});
    }
});
//delete a todo
app.delete('/todo/:todoid', async(req, res)=>{
    try{
    const deleteTodo = await todoModel.findOneAndDelete({_id:req.params.todoId});
    res.json({data:deleteTodo,
    message:'Todo successfully deleted'});
    }catch(err){
        res.json({message:err});
    }
});

//creating a todo
app.post('/', async (req, res)=>{
    const todo = todoModel.create({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status
    });
    try{
        const createTodo = await save();
        res.json({
           data: createTodo,
           message: "Todo successfully created",
           status: true
        });
    }catch(err){
        res.json({message:err});

    }
});


//get a particular todo by its id
app.get('/todo/:todoId', async (req, res)=>{
    try{
    const getOneTodo= await todoModel.findById({_id:req.params.todoId});
    res.json({data:getOneTodo,
    message:"Todo successfully retrieved"
})

    }
    catch(err){
        res.json({message:err});
    }

})
//databass connection
mongoose.connect(process.env.LT_URL,()=>console.log('successsfully connected'));


//port to listen to requests
app.listen( process.env.PORT_NUMBER || 2021);
