const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const todoModel = require('./models/todoModel');
const bodyParser = require('body-parser');

const app = express();
//middleware
app.use(bodyParser.json());
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
       message:'todo successfully updated' 
   });
    }catch(err){
        res.json({message:err});
    }
});
//delete a todo
app.delete('/todo/:todoId',(req, res)=>{
    try{
    todoModel.findOneAndDelete({_id:req.params.todoId});
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
        status: req.body.status,
        endDate: req.body.endDate
    });
    try{
        const createTodo = await todo.save();
        res.json({
           data: createTodo,
           message: "todo successfully created",
           status: true
        });
    }catch(err){
        res.json({message:err});

    }
});

app.get('/completed_todos',(req,res)=>{
  //  res.send('we are in the completed todo folder');
});
try{
    const getTodo =await todoModel.find();
    res.json({
        message:'Todos successfully retrieved',
        data:getTodo,
    });
}catch(err){
    res.json({message:err});
}
//get a particular todo by its id
app.get('/todo/:todoId', async (req, res)=>{
    try{
    const getOneTodo= await todoModel.findById({_id:res.params.todoId});
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
