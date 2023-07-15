
import fs from 'fs'

import { uploads } from "../utils/cloudinary";
import { Product } from '@/models/Product';


export const uploadProductImages = async (req, res, next) => {

    let product = await Product.findById(req.query.id);

    if (!product) {
        res.status(404).json({
            error: "Product not found.",
        });
    }

    const uploader = async (path) => await uploads(path, "ml_ecomm/products");

    const urls = []
    const files = req.files;

    for (const file of files) {
        const { path } = file
        const imgUrl = await uploader(path)
        urls.push(imgUrl)
        fs.unlinkSync(path)
    }

    product = await Product.findByIdAndUpdate(req.query.id, {
        images: urls
    });

    res.status(200).json({
        data: urls,
        product,
    });

}