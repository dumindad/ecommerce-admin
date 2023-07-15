import { v2 as cloudinary } from "cloudinary";

export default async function handler(req, res){
    const body = JSON.parse(req.body) || {};
    console.log("body", body)
    const { params_to_sign }= body;

    const api_secret = process.env.CLOUDINARY_API_SECRET
    // cloudinary.utils.api_sign_request(params_to_sign, api_secret);
    try{
        const signature = cloudinary.utils.api_sign_request(
            params_to_sign,
            api_secret
        );
        res.json({ signature });
        console.log("sign - signature", res.json({ signature }))
    }catch(error){
        console.log(error);
        res.send(error);
    }
}