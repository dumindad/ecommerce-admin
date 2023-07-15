

import { Product } from "@/models/Product";
import { uploads } from "../utils/cloudinary";
import fs from 'fs'


export const UploadProfile = async (req, res) => {
    const newUserData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,

        category: req.body.category,

    };
    if (req.files.length > 0) {
        const uploader = async (path) => await uploads(path, "ml_ecomm/products");

        const file = req.files[0]
        const { path } = file;

        const imgResponse = await uploader(path)
        fs.unlinkSync(path)
        newUserData.images = imgResponse
    }


    const productDoc = await Product.findByIdAndUpdate(req.Product._id, newUserData)

    //     for (const file of files){
    //         const {path } = file
    //         const imgUrl =  await uploader(path)
    //         urls.push(imgUrl)
    //         // fs.unlinkSync(path)
    //     }

 res.status(200).json({
    productDoc,
 })
}