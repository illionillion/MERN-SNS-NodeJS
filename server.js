import express from "express";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
import uploadRouter from "./routes/upload.js";
import path from 'path'

dotenv.config() // .env読み込み
const __dirname = new URL(import.meta.url).pathname
// console.log(process.env.MONGOURL);
// データベース接続
mongoose.connect(process.env.MONGOURL)
.then(e => {
    console.log('DBと接続中・・・');
}).catch(err => {
    console.log(err);
}) 

const app = express();

const PORT = 3001;

// ミドルウェア

// console.log(__dirname);
// console.log(path.join(__dirname, '../public/images'));
app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/upload', uploadRouter)

app.get('/', (req, res) => {
    res.send('hello express')
})
// app.get('/users', (req, res) => {
//     res.send('users express')
// })

app.listen(PORT, () => console.log(`サーバー起動：http://localhost:${PORT}`))