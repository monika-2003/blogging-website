const url = 'http://localhost:5000';

const grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

const uploadImage = (req, res) => {
    if(!req.file) {
        return res.status(404).json({msg: "File not found"})
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json({imageUrl});
}

const getImage = async(req, res) => {
    try{
        const file = await gfs.files.findOne({filename: req.params.filename});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    }
    catch (error) {
        return response.status(500).json({msg: error.message});
    }
}

module.exports = { uploadImage, getImage }
