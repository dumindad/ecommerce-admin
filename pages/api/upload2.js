// import multiparty from 'multiparty';


// import fs from 'fs';
// import mime from 'mime-types';
// import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
// const bucketName = process.env.CLOUDINARY_NAME;




// export default async function handle(req,res) {
//   const {method} = req;
//   await mongooseConnect();
//   await isAdminRequest(req,res);

//   app.get("/get-signature", (req, res) => {
    
//   })
//   if (method === 'GET') {
//     if (req.query?.id) {
//       res.json(await Product.findOne({_id:req.query.id}));
//     } else {
//       res.json(await Product.find());
//     }
//   }
//   const form = new multiparty.Form();
//   const {fields,files} = await new Promise((resolve,reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({fields,files});
//     });
//   });
//   console.log('length:', files.file.length);
// //   const client = new S3Client({
// //     region: 'us-east-1',
// //     credentials: {
// //       accessKeyId: process.env.CLOUDINARY_API_KEY,
// //       secretAccessKey: process.env.CLOUDINARY_API_SECRET,
// //     },
// //   });
//   const links = [];
//   for (const file of files.file) {
//     const ext = file.originalFilename.split('.').pop();
//     const newFilename = Date.now() + '.' + ext;
//     await client.send(new PutObjectCommand({
//       Bucket: bucketName,
//       Key: newFilename,
//       Body: fs.readFileSync(file.path),
//       ACL: 'public-read',
//       ContentType: mime.lookup(file.path),
//     }));
//     // const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
//     // const link = process.env.CLOUDINARY_URI;
//     links.push(link);
//   }
//   return res.json({links});
// }

// export const config = {
//   api: {bodyParser: false},
// };


