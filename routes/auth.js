import express from "express";
const authRouter = express.Router()

authRouter.get('/', (req, res) => {
    res.send('auth router')
})

export default authRouter