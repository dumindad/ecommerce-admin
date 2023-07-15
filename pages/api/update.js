
import nc from "next-connect";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { UploadProfile } from "@/backend/controllers/authControllers";
import upload from "@/backend/utils/multer";


const handler = nc({ onError });

await mongooseConnect();

// await isAdminRequest(req, res);

export const config = {
  api: {
    bodyParser: false
  }
}

const uploadMiddleware = upload.array("image")
// handler.use(isAdminRequest, uploadMiddleware).post(UploadProfile);
handler.use(uploadMiddleware).post(UploadProfile);

export default handler;