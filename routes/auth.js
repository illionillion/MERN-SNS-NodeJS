import express from "express";
const authRouter = express.Router()
import User from "../models/User.js";
// const userRouter = require('express').Router()

// ユーザー登録（POST）
authRouter.post('/register', async (req, res) => {
    try {
        // データ作成
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        // セーブ
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err) // 例外時に500番を返す 500はサーバー側のエラー
    }
})

// userRouter.get('/', (req, res) => {
//     res.send('user router')
// })

// userRouter.get('/profile', (req, res) => {
//     res.send('profile router')
// })

// export default userRouter;
// authRouter.get('/', (req, res) => {
//     res.send('auth router')
// })

export default authRouter