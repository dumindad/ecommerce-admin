import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(process.cwd(), "public", "uploads"))
    },
    filename: function(req, file, cb){
        cb(null, new Date().getTime()+'-'+file.originalname)
        // cb(null, new Date().toISOString()+'-'+file.originalname)
    }
})

const fileFilter =(req, file, cb) => {
    if(file.mimtype === 'image/jpeg' || file.mimtype === 'image/png' || file.mimtype === 'image/jpg'){
        cb(null, true)
    }else(
        {'error': 'Unsupported file format. Upload only JPEG/JPG or PNG'},
        false
    )
}

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024},
    fileFilter
})

export default upload;