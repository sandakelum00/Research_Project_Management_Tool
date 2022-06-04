const express = require('express');
const { status } = require('express/lib/response');
const posts = require('../models/posts');
const Posts = require('../models/posts');

const router = express.Router();



router.post('/posts/save',(req,res) => {
    let newPost = new Posts(req.body);

    newPost.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success: "Posts saved successfully"
        });
    });
});

router.get('/posts',(req,res) => {
    Posts.find().exec((err,posts) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

router.get("/post/:id",(req,res) => {
    let postId = req.params.id;

    posts.findById(postId,(err,post) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            post
        });
    });
});

router.put('/posts/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated successfully"
            });
            
        }

        
    );
});

router.delete('/posts/delete/:id',(req,res) => {
    Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        }); 

        return res.json({
            message:"Deleted Succesfull",deletedPost
        });
    });
});

module.exports = router;