import express from "express";
import Post from "../models/Post.js";
const postRouter = express.Router()

// 投稿を作成する
postRouter.post('/', async (req, res) => {
    // インスタンス生成
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        return res.status(200).json(savePost)
    } catch (err) {
        // 方が間違ってたり、入力必須が満たせていないとエラー
        return res.status(500).json(err)
    }
})

export default postRouter