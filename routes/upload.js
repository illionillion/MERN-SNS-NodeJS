import express from "express";
import multer from "multer";

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images") // この場所に画像を保存
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name) // フォーム内の画像ファイル名を取得
    }
})
const upload = multer({storage})

// 画像アップロード用のAPI
uploadRouter.post("/",  upload.single("file")/* ⇦ミドルウェア */ , (req, res) => {
    try {
        return res.status(200).json({msg:"がぞうアップロード成功"})
    } catch (error) {
        console.log(error);
    }
})

export default uploadRouter
