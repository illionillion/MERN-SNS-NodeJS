// import mongoose, { Schema } from "mongoose";
import mongoose from 'mongoose';
// import pkg from 'mongoose';
const { Schema } = mongoose;

/**
 * スキーマ定義
 */
const UserSchema = new Schema(
    {
        username: {
            type: String, // データ型
            required: true, // 強制かどうか
            min: 5, // 最小
            max: 25, // 最大
            unique: true, // ユニーク
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 50,
        },
        profilePicture: { // プロフィール画像のパス
            type: String,
            // required: true,
            default: '', // デフォルト値
        },
        coverPicture: {
            type: String,
            // required: true,
            default: '',
        },
        followers: { // フォロワー
            type: Array,
            default: [],
        },
        followings: { // フォロー
            type: Array,
            default: [],
        },
        isAdmin: { // 権限・ログインしてるかどうか
            type: Boolean,
            default: false
        },
        desc: { // 説明・詳細
            type: String,
            max: 70,
        },
        city: { // 住んでるところ
            type: String,
            max: 50,
        }
    },
    { timestamps: true} // 時間格納
)

export default mongoose.model('User', UserSchema)