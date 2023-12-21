const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const saltRound = 10;
require('dotenv').config()


const getTodayDate = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth()+1).padStart(2,'0')
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

router.post('/register' , async (req,res) => {
    const {name, email, username, password} = req.body;
    let hashPassword=  '';

    const userExists = await Users.findOne({
        where: {
            username: username
        }
    })
    
    if(userExists) return res.status(400).send({'message' : 'Username already exists!'})
    await bcrypt.hash(password, saltRound)
        .then((hash) => {
            hashPassword = hash
        })
    const newUser = await Users.create({
        username: username,
        email: email,
        name: name,
        password: hashPassword
    })
    res.status(200).send({'message': 'User created!'})
})


router.post('/login', async (req, res) => {
    const {username , password} = req.body;

    if(!username || !password) return res.status(400).send({'message' : 'Username and password is required!!'});
    const foundUser = await Users.findOne({
        where: {
            username: username
        }
    }) 

    if(!foundUser) return res.status(401).send({'message': 'User Not found!'});
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if(passwordMatch){
        const accessToken = jwt.sign(
            {"username": foundUser.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1'}
        )
        const refreshToken = jwt.sign(
            {"username": foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'}
        )
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60*60*1000})
        res.json({foundUser, accessToken, refreshToken})
    }else{
        res.sendStatus(401)
    }
})

router.post('/verify-token', async (req, res) => {
    const token = req.body.token;
    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    res.json(decode)
})

router.post('/refresh', async (req , res) => {
    const refreshToken = req.cookies['jwt'];
    if(!refreshToken) return res.status(401).send('Access Denied. No refresh token provide.')

    try{
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({foundUser: decoded.user}, ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.header('Authorization', accessToken)
        .json({accessToken});
    }catch(err) {
        return res.status(400).send('Invalid Token')
    }
})
module.exports = router