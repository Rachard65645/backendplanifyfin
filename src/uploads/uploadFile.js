import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png/;
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileType.test(file.mimetype);
        if (extname && mimeType) cb(null, true);
        else cb(new Error("Seules les images (jpeg, jpg, png) sont autorisées !"));
    },
});

const uploadSingleImage = upload.single("images");

const processImage = async (req, res, next) => {
    try {
        if (!req.file) return next();

        const uploadDir = path.join("public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const filename = `compressed_${Date.now()}${path.extname(req.file.originalname)}`;
        const filepath = path.join(uploadDir, filename);

        await sharp(req.file.buffer)
            .resize({ width: 800 })
            .jpeg({ quality: 70 })
            .toFile(filepath);

        req.file.pathDB = `uploads/${filename}`;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur lors du traitement de l'image." });
    }
};

export { uploadSingleImage, processImage };