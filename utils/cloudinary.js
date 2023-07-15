import { v2 as cloudinary } from 'cloudinary'

const cloudinaryMyconfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};


const uploads = (file, folder) => {
// const uploadImage = (image) => {

    // const image =  "../public/uploads/5sdf.jpg"
   
    return new Promise(async(resolve, reject) => {
       const result = await cloudinary.uploader.upload(
    //     file, 
    //     opts, (error, result)=>{
    //     if(result && result.secure_url){
    //         console.log(result.secure_url);
    //         return resolve(result.secure_url);
    //     }else {
    //         console.log(error.message) 
    //         return reject({message: error.message})
    //     }
    //    }
        
            file,(result) => {
                resolve({
                    public_id: result.public_id,
                    url: result.url,
                })
            },
            {
                resource_type: "auto",
                folder: folder
            }
        )
        // console.log(result)
    })
  
}
export { uploads, cloudinaryMyconfig}