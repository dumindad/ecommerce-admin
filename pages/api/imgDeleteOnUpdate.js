
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";
import connectMongo from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const {method} = req;
  await connectMongo()
  await isAdminRequest(req,res);

  if (method === 'GET') {
    res.json(await Product.find().populate('images'));
  }

  
 
}