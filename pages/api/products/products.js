import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { diskStorage } from "multer";




export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {

    const { title, description, price, images, category, properties } = req.body;
    // const {title,description,price} = req.body;
    console.log(req.body)
    
    const productDoc = await Product.create({
      title, description, price, images, category, properties,
      // title,description,price
    })
    res.json(productDoc);
    console.log(productDoc)
  }

  if (method === 'PUT') {
    const { title, description, price, images, category, properties, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images, category, properties });
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}