import express from "express";
const userRouter = express.Router()
// const userRouter = require('express').Router()

userRouter.get('/', (req, res) => {
    res.send('user router')
})

userRouter.get('/profile', (req, res) => {
    res.send('profile router')
})

export default userRouter;