import express from "express";
import userRoute from "./routes/users.js";

const app = express();

const PORT = 3000;

// ミドルウェア
app.use('/api/users', userRoute)

// app.get('/', (req, res) => {
//     res.send('hello express')
// })
// app.get('/users', (req, res) => {
//     res.send('users express')
// })

app.listen(PORT, () => console.log('サーバー起動：localhost:3000'))