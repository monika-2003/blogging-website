const Post = require('../models/CreatePost');

async function uploadPost(req, res) {
    try {
        const post = await new Post(req.body)
        post.save();

        return res.status(200).json({msg: "Post saved successfully"})

    } catch(err) {
        return res.status(500).json({msg: "Network error please try again later"})
    }

}

async function getPosts(req, res) {
    const category = req.query.category;
        let posts;
    try{
        if(category) {
            posts = await Post.find({category: category});
        }
        else {
            posts = await Post.find({});
        }

        res.status(200).json(posts)        

    } catch(err) {
        return res.status(500).json({msg: "Not able to fetch posts"})
    }
}

async function getSelectedPost(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)

    } catch(err) {
        return res.status(500).json({msg: "post not found"})
    }
}


async function updatePost(req, res) {
    try{
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: "post not found"});
        }

        await Post.findByIdAndUpdate(req.params.id, {$set: req.body});
        return res.status(200).json({msg: "updated successfully"})

    } catch(err) {
        return res.status(500).json({msg: "Some error occurred"})
    }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({msg: "post not found"});
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: "deleted successfully"})

    } catch(err) {
        return res.status(500).json({msg: "Some error occurred"})
    }
}

module.exports = { uploadPost, getPosts, getSelectedPost, updatePost, deletePost }
