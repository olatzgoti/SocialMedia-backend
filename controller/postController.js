const Post = require('../model/PostModel')
const User = require('../model/UserModel')
const Comment = require('../model/CommentModel')
//require('dotenv').config({ path: './src/config/dotenv' })

const PostController = {


    async getAll(req, res){
        try {
            const { page=1, limit= 10, title, _id } = req.query

            const searchWords = {}
            if(title)
                {
                    searchWords.title = { $regex: new RegExp(title, 'i') }
                }
            if(_id)
                {
                    searchWords._id = {$regex: new RegExp(_id, 'i')}
                }

            const posts = await Post.find({ ...searchWords })
                .populate('likes.userId')
                .limit(limit)
                .skip((page -1)* limit)

            res.send({ message:'Results:', posts})            
        }
        
        catch (error) {
            console.error(error)
        }
    },

    async create(req, res, next){ 
     try {
         const post = await Post.create({
            ...req.body,
            userId: req.user._id
        })
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { publishedPostsIds: post._id }},
            { new: true }
         ),
        res.send({ message: 'Post created' , post })
        
     } 
    catch (error) {
        console.error(error)
        error.origin('user')
        next(error)
    }
    },

    async update(req, res){
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
                new: true,
            })
            if(!post){
                return res.status(400).send({message: 'Post not found'})
            }
            res.status(200).send(post)

        } 
        catch (error) 
        {
            console.error(error)
            res
            .status(500)
            .send({message:'There was a problem with the update of the post'})
            }
    },

    async like(req, res){
        try {
            const post = await Post.findOne({
                _id: req.params._id,
                'likes.like': true,
                'likes.userId': req.user._id,
            })
            if(post){
                return res
                    .status(400)
                    .send({message: 'Post already liked by the user'})
            }
            const updatedPost = await Post.findByIdAndUpdate(
                req.params._id,
                { $push: { likes: { like: true, userId: req.user._id } } },
                { new: true }
            )
            if(!updatedPost)
            {
                return res.status(400).send({ message: 'Post not found'})
            }
            res.status(200).send({message: 'You hace liked the post', updatedPost})
           
        } 
        
        catch (error) {
            console.error(error)
            res.send({message: 'There was a problem giving like'})
        }
    },

    async unlike(req, res){
        try {
            

            const post = await Post.findOne({
                _id: req.params._id,
                'likes.like': true,
                'likes.userId': req.user._id,
            })
            if(!post)
            {
        return res.status(400).send({message: 'You didnt like this post yet'})
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params._id,
        { $pull: { likes: { userId: req.user._id } } },
        { new: true }
        )

        if(!updatedPost){
            res.send({ message:'Post not found' })
        }
        
        await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likedPosts: req.params._id } },
        { new: true }
    )

        res
        .status(200)
        .send({ message: "You have unliked the post", updatedPost });
        

    } 
    catch (error) {
    console.log(error)    
    }
    },

    async delete(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params._id, { new: true });
        res
            .status(200)
            .send({ message: "You have succesfully deleter the post", post });
    } 
    catch (error) {
    console.error(error);
    res
        .status(500)
        .send({ message: "There was a problem deleting the post" });
    }
    },
}

module.exports = PostController