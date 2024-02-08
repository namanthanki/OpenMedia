import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, res, cb) => {    
        cb(null, "/public/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${file.filename}-${uniqueSuffix}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;