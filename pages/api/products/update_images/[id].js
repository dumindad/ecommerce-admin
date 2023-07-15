import nc from "next-connect";

// import onError from "@/backend/middlewares/errors";

// import {
//   authorizeRoles,
//   isAuthenticatedUser,
// } from "@/backend/middlewares/auth";
import { uploadProductImages } from "@/backend/controllers/productControllers";
import { mongooseConnect } from "@/lib/mongoose";
import upload from "@/backend/utils/multer";

const handler = nc({ 
  onError: (err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) =>{

    res.status(404).end("Page is not found");
  },
 });

await mongooseConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

handler
  // .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles("admin"))
  .use(uploadMiddleware)
  .post(uploadProductImages);

export default handler;
