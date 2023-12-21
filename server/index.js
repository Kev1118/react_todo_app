const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./models')

app.use(cors())
app.use(express.json())


//Routes
const todoRouter = require('./routes/todoRoutes')
app.use('/api/todo', todoRouter)
const authRouter = require('./routes/authRoutes')
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
    
})
