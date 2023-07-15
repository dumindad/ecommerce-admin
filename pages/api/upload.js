
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { uploads } from "@/utils/cloudinary";

export const config = {
    api: {
        bodyParser: false,
    },
}
export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'POST') {
        console.log('POST', req.body)
        // const { path } = req.body.fileUrl
        const path  = "@/public/uploads/6qwr.jpg"
        const result = await uploads(path, {
                resorce_type: "image"
            })
            .then((result) => {
                res.status(201).json({body: req.body,})
                console.log("success", JSON.stringify(result, null, 2));
            })
            .catch((error) => {
                console.log(error)
                console.log("error", JSON.stringify(result, null, 2))
            })
        //  res = await uploads(path, "ml_ecomm/products",{
        //     resorce_type: "image"
        // });

        // const { title, description, price, images, category, properties } = req.body;
        // const productDoc = await Product.create({
        //     title, description, price, images, category, properties,
        // })

        // res.json(productDoc);
    }


}