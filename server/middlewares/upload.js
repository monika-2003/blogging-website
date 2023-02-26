const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/newBlog',
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if(match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketName: "photos",
            fileName: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

module.exports = multer({storage})