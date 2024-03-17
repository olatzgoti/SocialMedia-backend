const Comment = require('../model/CommentModel')
const User = require('../model/UserModel')
const Post = require('../model/PostModel')


const CommentController = {

    async getAll(req, res) {
        try {
            const comment = await Comment.find()
            
            res.send({message:'Results: ', comment })
      
        }        
        catch (error) {
          
            res.send(error)
        }
    },

    async create(req, res, next){

        try {
            const comment = await Comment.create({
                ...req.body,
                userId: req.body.userId,
                postId: req.body.postId
            } 
            )
            /*await User.findByIdAndUpdate(
                req.user._id,
                { $push: {commentedPostsIds: req.body.postId }},
                { new: true }
            )*/
          
            const post = await Post.findByIdAndUpdate(
                 req.body.postId,
                 { $push: { commentsId: comment._id }},           
                 )

            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { commentedPostsIds: req.body.postId }}
            )
            if(!post){
                res.status(404).send({message: "Post selected doesn't exist"})
            }

        res.status(200).send({message: 'you have commented the selected post'})
        }
        catch (error) {
            console.error(error)
            next(error)
        }

    },
        async update(req, res){
        try {
            const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, {
                new: true,
            })
            if(!comment){
                return res.status(400).send({message: 'Comment not found'})
            }
            res.status(200).send(comment)
        } 
        catch (error) 
        {
            console.error(error)
            res
            .status(500)
            .send({message:'There was a problem with the update of the comment'})
            }
    },




    async delete(req, res){
        try {
            
            const comment = await Comment.findByIdAndDelete(
                req.params._id,
                { new: true, }
            )
        res.status(200).send({ message: 'Coment deleted', comment })
        } 
        catch (error) {
            console.log('Failed deleting comment')
        }
    }


}
module.exports = CommentController