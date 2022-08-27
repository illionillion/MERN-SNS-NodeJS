import mongoose from "mongoose";
const {Schema} = mongoose
// フレキシブルに作れる
/**
 * ポストスキーマ
 */
const PostSchema = new Schema(
    {
        userId: { // ユーザーID
            type: String,
            required: true
        },
        desc: { // 投稿内容
            type: String,
            max: 200, // 最大文字数
        },
        img: { // 画像
            type: String,
        },
        likes: { // 誰がいいねを押したかを格納
            type: Array,
            default: []
        },
    },
    {timestamps: true}
)

export default mongoose.model('Post', PostSchema)