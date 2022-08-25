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

// ログイン
authRouter.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ email: email }) // emailでユーザーを探す
        if(!user) return res.status(404).send('ユーザーが見つかりません。') // ユーザーが見つからなかった場合
        
        const vailedPassword = req.body.password === user.password // true or false
        if(!vailedPassword) return res.status(400).json('パスワードが違います。') // 400 Bad Request (リクエストが正しくない)

        return res.status(200).json(user) // ログインできたらユーザー情報を返す
    } catch (err) {
        return res.status(500).json(err)
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