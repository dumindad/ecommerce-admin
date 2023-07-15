import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import multer from "multer";
// import nextConnect from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
}
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads"));
      },
      filename: function (req, file, cb) {
        cb(null, new Date().getTime() + "-" + file.originalname);
      },
    }),
  });
  

// const handler = nextConnect(
//     { 
//     onError: (err, req, res, next) =>{
//       console.error(err.stack);
//       res.status(500).end("Something broke!");
//     },
//     onNoMatch: (req, res, next) =>{
  
//       res.status(404).end("Page is not found");
//     },
//    }
//    )
//    .use(upload.array("image"))
//    .post((req, res, )=> {
//     console.log("upload ssss ",req.body, req.file)
//     res.status(201).json({body: req.body, file: req.file})
//    })
  
// export default handler;

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);
  
    console.log( 'req', req.body)
   
  
    if (method === 'POST') {
  
      const { title, description, price, imgFile, category, properties } = req.body;
      
      console.log( 'POST', req?.body)
      
      const productDoc = await Product.create({
        // title, description, price, category, properties,
        title, description, price
      })
      res.json(productDoc);
      console.log("product")
    }
  
   
  }