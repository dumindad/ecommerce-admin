import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import multer from "multer";
// import nc from 'next-connect';
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { createRouter, expressWrapper } from "next-connect";

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
export const config = {
    api: {
        bodyParser: true,
    },
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public/uploads"));
        },
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname);
        },
    }),
});


//   const handler = createRouter(
//         { 
//         onError: (err, req, res, next) =>{
//           console.error(err.stack);
//           res.status(500).end("Something broke!");
//         },
//         onNoMatch: (req, res, next) =>{

//           res.status(404).end("Page is not found");
//         },
//        }
//        )
//        .use(upload.array("imagesPreview"))
//        .post((req, res, )=> {
//         console.log("upload ssss ",req.body, )
//         console.log("upload ssss ",req.body, req.file)
//         res.status(201).json({body: req.body, file: req.file})

//         const newProducts = new Product()
//        })

//     export default handler;

export default async function handle(req, res) {
    try {


        const { method } = req;
        await mongooseConnect();
        await isAdminRequest(req, res);

        console.log('req', req.body)
        if (req.method === 'GET') {
            res.status(200).json("ok")
        }
        else if (req.method === 'POST') {
            const resImage = req.body
            if (!req.body) {
                console.log("req undefined no data")
            } else {
                //---------------------- one image Upload----------------//

                // const image = resImage[0]
                // const response = await cloudinary.uploader.upload(image, { folder: 'ml_ecomm' })
                // console.log("response cloudinary", response)
                // res.send(response)
                //----------------------- multipal Image Upload------------------------//

                const promises = []
                resImage.forEach(async image => {
                    promises.push(
                        cloudinary.uploader.upload(image, { folder: 'ml_ecomm' })

                    )

                })
                const response = await Promise.all(promises)
                console.log("response cloudinary", response)
                res.send(response)

            }
        }
    } catch (error) {
        console.log(error)

        //   const { title, description, price, imgFile, category, properties } = req.body;

        // console.log('POST', req?.body)

        // const productDoc = await Product.create({
        //     // title, description, price, category, properties,
        //     title, description, price
        // })
        // res.json(productDoc);
        // console.log("product")
    }


}