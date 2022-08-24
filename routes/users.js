import express from "express";
import User from "../models/User.js";
const userRouter = express.Router()
// const userRouter = require('express').Router()

// CRUD
// ユーザー情報の更新 // :id MongoDBのオブジェクトID
userRouter.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body // 書き換え
            })
            res.status(200).json('ユーザー情報の更新が完了しました。')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json('アカウントが違います。')
    }
})
// ユーザー情報の削除

// ユーザー情報の取得

export default userRouter;