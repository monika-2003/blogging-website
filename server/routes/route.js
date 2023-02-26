const express = require('express');
const router = express.Router();
const { createuser, userLogin } = require('../controllers/user-controller');
const { uploadImage, getImage } = require('../controllers/image-controller');
const {uploadPost, getPosts, getSelectedPost, updatePost, deletePost} = require('../controllers/post-controller');

const upload = require('../middlewares/upload'); // this middleware is used to convert the image from binary format
const postAuthentication = require('../middlewares/postAuthentication');


router.post('/signup', createuser);
router.post('/login', userLogin);

router.post('/upload-image', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage)

router.post('/upload-post',postAuthentication, uploadPost)
router.get('/posts', postAuthentication, getPosts) 
router.get('/get-post/:id', postAuthentication, getSelectedPost)
router.put('/update-post/:id', postAuthentication, updatePost)
router.delete('/delete-post/:id', postAuthentication, deletePost)

module.exports = router
