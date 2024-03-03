import { v4 as uuidv4 } from "uuid";

const supportedImageMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp",
];

export const imageValidator = (size, mimetype) => {
    if (bytesToMb(size) > 2) {
        return "File size is too large";
    }

    if (!supportedImageMimeTypes.includes(mimetype)) {
        return `File type is not supported, Only Allowed: ${supportedImageMimeTypes.join(", ")}`;
    }

    return null;
};

export const bytesToMb = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
};

export const generateFileName = (file) => {
    const fileExtension = file.originalname.split(".").pop();
    return `${uuidv4()}.${fileExtension}`;
};
