const express = require('express')
const router = express.Router()
const {Todos} = require('../models')

const getTodayDate = () =>{
    var today = new Date()
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth()+1).padStart(2,'0')
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
const formatDate = (date) => {
    var date = new Date(date)
    var dd = String(date.getDate()).padStart(2,'0')
    var mm = String(date.getMonth()+1).padStart(2,'0')
    var yyyy = date.getFullYear()
    return mm + '/' + dd + '/' + yyyy
}


router.put('/update-finish', async (req, res) => {
    let id = req.body.id
    const todo  = await Todos.findOne({
        where: {
            id: id
        }
    })
    todo.isFinish = !todo.isFinish;
    if(todo.isFinish == 1){
        todo.finish_date = getTodayDate()
    }else{
        todo.finish_date = null
    }
    todo.save()
    res.status(200).json({'message': 'success'});
})


router.post('/update-todo', async (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let description = req.body.description

    const todo = await Todos.findOne({
        where: {
            id: id
        }
    })
    todo.title = title
    todo.description = description
    todo.save()
    res.status(200).json({'message': 'success'})

})

router.put('/delete-todo', async (req, res) => {
    id = req.body.id
    const todo = await Todos.findOne({
        where:{
            id: id
        }
    })
    todo.deleted_date = getTodayDate()
    todo.save();
    res.status(200).json({'message' : 'Deleted! '})
})
router.post('/create-todo', async (req, res) => {
    let form = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
    }
    await Todos.create(form);
    res.status(200).json({'message': 'success'})
})
router.post('/get-one-todo', async (req, res) => {
    var id = req.body.id;

    const todo = await Todos.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json(todo);
})

router.post('/', async (req, res) => {
    let user_id = req.body.user_id;

    var payload = [];
    var finishTodo = []
    const pendingTodoList = await Todos.findAll({
        where:{
            deleted_date: null,
            isFinish: 0,
            user_id: user_id
        }
    });
    const finishTodoList = await Todos.findAll({
        where:{
            deleted_date: null,
            isFinish: 1,
            user_id: user_id
        }
    })
    finishTodoList.map((data) => {
        let newFinishDate = formatDate(data.finish_date)
        finishTodo.push({
            'id':data.id, 'title': data.title, 'description':data.description,'finish_date': newFinishDate
        });
    })
    payload = {'pending': pendingTodoList, 'finish': finishTodo}
    
    
    res.json(payload)
})

module.exports = router