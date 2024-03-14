const Comment = require('../model/CommentModel')
const User = require('../model/UserModel')
const Post = require('../model/PostModel')


const CommentController = {


    async create(req, res, next){

        try {
            const comment = await Comment.create({
                ...req.body,
                userId: req.body._id,
            } 
            )
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: {commentedPostsIds: req.body.postId }},
                { new: true }
            )
          
            const post = await Post.findByIdAndUpdate( {_id: req.body.postId })
        
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