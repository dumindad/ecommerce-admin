import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);


    const uploadImage = async (image) => {
// const {}
        // return new Promise(async (resolve, reject) => {
            try {

                const result = await cloudinary.uploader.upload(image, {
                    upload_preset: "ml_ecomm"
                },
                (error, result) => {
                    if (result && result.secure_url) {
                        console.log(result.secure_url);
                        return resolve(result.secure_url);
                    } else {
                        console.log(error.message)
                        return reject({ message: error.message })
                    }
                }
                )
                console.log("result", result)
                // if (method === 'POST') {
                // const { uploadImage } = req.body.image;
                //     // const {title,description,price} = req.body;
                //     try{

                // console.log("POST", req.body.image)
                //        const response = await uploadImage(req.body.image)
                //        res.status = 200;
                //        res.setHeader("Content-Type", "multipart/form-data");
                //     }catch(error){
                //         res.json(error)
                //         res.status(405).end();
                //     }
                //     // .then((url) => res.send(url))
                //     // .catch((err) => res.status(500).send(err))



                //     // res.json(productDoc);
                //     // console.log(productDoc)
                // }
            }catch(error){
                console.log(error)
                res.status(500).send(error)
            }
            }
        // )
    // }


}