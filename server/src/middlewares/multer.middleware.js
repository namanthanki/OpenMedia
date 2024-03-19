import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];

const generateFileName = (prefix) => {
    return (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const fileName = `${prefix}-${uniqueSuffix}-${file.originalname}`;
        cb(null, fileName);
    };
};

const fileFilter = (req, file, cb) => {
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG and PNG are allowed"));
    }
};

const profileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/uploads/profile");
    },
    filename: generateFileName("profile"),
});

const profileUpload = multer({
    storage: profileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}).fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
]);

const postStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/uploads/posts");
    },
    filename: generateFileName("post"),
});

const postUpload = multer({
    storage: postStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}).single("image");

export { profileUpload, postUpload };
