
import Users from '../../models/UserModels'
import connectMongo from "../../database/conn";
import { hash } from 'bcrypt';
// import User from "@/models/User";
// import { mongooseConnect } from "@/lib/mongoose";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

// import bcrypt, { hash } from "bcryptjs";
// import connectMongo from "../../../database/conn";
// import Users from '../../../model/Schema'

export default async function Handler(req, res){
   
   await connectMongo().catch(error => res.status(500).json({error: "Connection Failed..!"}))
   const {method} = req;
//   await mongooseConnect();
  // await isAdminRequest(req,res);

  

  if (method === 'POST') {
    const {username, email, password} = req.body;
    console.log(req.body)
    const userDoc = await Users.create({
        username, email, password: await hash(password, 12)
    
    })
    res.json(userDoc);
    console.log(userDoc)
  }

   
//     try {
//         await mongooseConnect();
//         const { username, email, password: pass } = await req.json()
//         const isExisting = await User.findOne({ email })
//         if (isExisting) {
//             throw new Error("User already exists")
//         }
//         const hashedPassword = await bcrypt.hash(pass, 10)
//         const newUser = await User.create({ username, email, password: hashedPassword })
//         const { password, ...user } = newUser._doc
// console.log("respons test")
//         return new res(JSON.stringify(user), { status: 201 })

//     } catch (error) {
//         return new Response(JSON.stringify(error.message), { status: 500 })
//     }

}