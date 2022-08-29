import express from "express";
import Post from "../models/Post.js";
const postRouter = express.Router()

// 投稿を作成する
postRouter.post('/', async (req, res) => {
    // インスタンス生成
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        return res.status(200).json(savePost) // 投稿できたらその内容を返す
    } catch (err) {
        // 型が間違ってたり、入力必須が満たせていないとエラー
        return res.status(500).json(err)
    }
})

// 投稿を更新する
postRouter.put('/:id', async (req, res) => { // :id = postId
    try {
        const post = await Post.findById(req.params.id) // idでpost内容を取得
        // bodyのユーザーIDと投稿のユーザーIDが等しければ更新できる
        if (post.userId !== req.body.userId) {
            return res.status(403).json('あなたは他の人の投稿を編集できません。')
        }
        await post.updateOne({
            $set: req.body,
        })
        return res.status(200).json('投稿編集に成功しました。') // 投稿できたらその内容を返す
    } catch (err) {
        return res.status(403).json(err)
    }
})

// 投稿を削除する
postRouter.delete('/:id', async (req, res) => { // :id = postId
    try {
        const post = await Post.findById(req.params.id) // idでpost内容を取得
        // bodyのユーザーIDと投稿のユーザーIDが等しければ削除できる
        if (post.userId !== req.body.userId) {
            return res.status(403).json('あなたは他の人の投稿を削除できません。')
        }
        // ここで削除
        // await Post.findByIdAndDelete(req.params.id)
        await post.deleteOne() // これで削除できる
        return res.status(200).json('投稿削除に成功しました。') // 投稿できたらその内容を返す
    } catch (err) {
        return res.status(403).json(err)
    }
})

export default postRouter