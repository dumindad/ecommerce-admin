import { Product } from "@/models/Product";
// import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { v2 as cloudinary } from 'cloudinary'
import connectMongo from "@/lib/dbConnect";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb' // Set desired value here
    }
  }
}

export default async function handle(req, res) {
  const { method } = req;

  await connectMongo()
  await isAdminRequest(req, res);

  if (method === 'GET') {
    try {
      console.log("req.query", req.query)
      if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
      } else {
        res.json(await Product.find());
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (method === 'POST') {
    try {
      const { title, description, price, category, properties } = req.body;
      const resImage = req.body?.imagesPreview


      const promises = []
      resImage.forEach(async image => {
        promises.push(
          cloudinary.uploader.upload(image, { folder: 'ml_ecomm' })
        )
      })
      const response = await Promise.all(promises)
      console.log("response cloudinary", response)
      console.log("response public_id", response.length)

      if (response.length > 0) {
        const images = response.map((x) => ({ public_id: x.public_id, url: x.url }))

        console.log("response images", images)
        // res.send(response)

        const productDoc = await Product.create({
          title, description, price, images, category, properties,
        })
        console.log(productDoc)
        res.send(productDoc);
        // res.json(productDoc);
      }


    } catch (error) {
      console.log(error)
    }
  }

  if (method === 'PUT') {
    try {


      const { title, description, price, category, existingImages, properties, _id } = req.body;
      const resImage = req.body?.imagesPreview

      console.log("resImage", resImage)
      const promises = []
      resImage.forEach(async image => {
        promises.push(
          cloudinary.uploader.upload(image, { folder: 'ml_ecomm' })
        )
      })
      const response = await Promise.all(promises)
      // console.log("response cloudinary 11", response)
      // console.log("response public_id", response.length)


      const images = response?.map((x) => ({ public_id: x?.public_id, url: x?.url }))

      // console.log("response images", images)

      const promises2 = []

      console.log("response existingImages", existingImages)
      existingImages.forEach(async image => {
        promises2.push(
          cloudinary.uploader.destroy(image?.public_id,

          )
        )
      })
      const response2 = await Promise.all(promises2)
      console.log("delet exsisting Images", response2)
      // res.send(response)

      await Product.updateOne({ _id }, { title, description, price, images, category, properties });
      res.json(true);
      // }
    } catch (error) {
      console.log(error)
    }
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}