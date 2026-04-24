// const multer = require("multer");
// const path = require("path");

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 1024 * 1024 * 5, // 5MB
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname).toLowerCase();
//         if (ext === ".pdf" && file.mimetype === "application/pdf") {
//             cb(null, true);
//         } else {
//             cb(new Error("Only .pdf files are allowed"), false);
//         }
//     }
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

const PDF_MAGIC_BYTES = Buffer.from([0x25, 0x50, 0x44, 0x46]); // %PDF

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".pdf" || file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed"), false);
        }
        cb(null, true);
    }
});

// Controller mein, PDF parse karne se pehle magic bytes check karo:
const verifyPDFBuffer = (buffer) => {
    return buffer.slice(0, 4).equals(PDF_MAGIC_BYTES);
};

module.exports = { upload, verifyPDFBuffer };