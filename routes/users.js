import express from "express";
import User from "../models/User.js";
const userRouter = express.Router()
// const userRouter = require('express').Router()

// CRUD
// ユーザー情報の更新 // :id MongoDBのオブジェクトID
userRouter.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) { // 他のユーザーが操作できないようにする
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body // 書き換え
            })
            return res.status(200).json('ユーザー情報の更新が完了しました。')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json('アカウントが違います。ユーザー情報の更新ができません。')
    }
})
// ユーザー情報の削除
userRouter.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) { // 他のユーザーが操作できないようにする
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json('ユーザー情報の削除がされました。')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json('アカウントが違います。ユーザー情報の削除ができません。')
    }
})

// ユーザー情報の取得
// userRouter.get('/:id', async (req, res) => {
// クエリでユーザー情報を取得
userRouter.get('/', async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    // 本人かどうかのチェックは必要ない
    try {

        const user = userId ? await User.findById(userId) : await User.findOne({username: username})
        // パスワードなどの情報も見られてしまうので取り除く
        const { password, updatedAt, ...other } = user._doc // 分割代入とスプレッド構文 // なぜか._docがいる
        return res.status(200).json(other) // otherを返す
    } catch (err) {
        return res.status(500).json(err)
    }
})

// ユーザーのフォロー
userRouter.put('/:id/follow', async (req, res) => {
    // ユーザーをフォローできる条件 // :idが自分意外であること
    if (req.body.userId !== req.params.id) {
        try {
            
            const user = await User.findById(req.params.id) // フォローするユーザー取得
            const currentUser = await User.findById(req.body.userId) // 現在のユーザー
            
            // フォローするユーザーのフォロワーリストに自分がいたらフォローできない
            if (user.followers.includes(req.body.userId)) {
                // 既にフォロー済み
                return res.status(403).json('あなたは既にこのユーザーをフォローしています。')
            } 

            // 相手側の更新処理
            await user.updateOne({ // 一部更新
                $push: {
                    followers: req.body.userId // フォロワーの配列に追加
                }
            })

            // 自分側の更新処理
            await currentUser.updateOne({
                $push: {
                    followings: req.params.id // 自分のフォローの配列に追加
                }
            })

            // 処理完了
            return res.status(200).json('フォローに成功しました。')

        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json("自分自身をフォローできません。")
    }
})

// ユーザーのフォローを外す（アンフォロー）
userRouter.put('/:id/unfollow', async (req, res) => {
    // ユーザーをフォローできる条件 // :idが自分意外であること
    if (req.body.userId !== req.params.id) {
        try {
            
            const user = await User.findById(req.params.id) // フォローするユーザー取得
            const currentUser = await User.findById(req.body.userId) // 現在のユーザー
            
            // フォローするユーザーのフォロワーリストに自分がいたらフォローを外せる
            if (!user.followers.includes(req.body.userId)) {
                // 既にフォロー済み
                return res.status(403).json('あなたはこのユーザーをフォローしていません。')
            } 

            // 相手側の更新処理
            await user.updateOne({ // 一部更新
                $pull: {
                    followers: req.body.userId // フォロワーの配列に追加
                }
            })

            // 自分側の更新処理
            await currentUser.updateOne({
                $pull: {
                    followings: req.params.id // 自分のフォローの配列に追加
                }
            })

            // 処理完了
            return res.status(200).json('フォロー解除しました。')

        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(500).json("自分自身をフォロー解除できません。")
    }
})

export default userRouter;