const Post = require("../models/Post");


module.exports = {
    createPost: async (req, res) => {
        const newPost = new Post(req.body);

        try {
            const savedPost = await newPost.save();
            const { __v, updatedAt, ...newPostInfo } = savedPost._doc;
            res.status(200).json(newPostInfo)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updatePost: async (req, res) => {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: req.body },
            { new: true }
          );
          const { __v,updatedAt, ...post } = updatedPost._doc;
          res.status(200).json(post);
        } catch (error) {
          res.status(500).json(error);
        }
      },
    
    
      deletePost: async (req, res) => {
        try {
          await Post.findByIdAndDelete(req.params.postId);
          res.status(200).json({ message: 'Post deleted successfully.' });
        } catch (error) {
          res.status(500).json(error);
        }
      },
      
    
      getAllPosts: async (req, res) => {
        try {
          const posts = await Post.find({ type: 0}).sort({ date: -1 });
          res.status(200).json(posts);
        } catch (error) {
          res.status(500).json(error);
        }
      },

  getAllPostsByType: async (req, res) => {
    try {
      // Find posts of type 1 and sort them by date in descending order
      const posts = await Post.find({ type: 1 }).sort({ date: -1 });

      // Send the sorted posts as JSON response
      res.status(200).json(posts);
    } catch (error) {
      // Handle errors and send a 500 status code along with the error details
      res.status(500).json(error);
    }
  },


  getPostById: async (req, res) => {
        try {
          const post = await Post.findById(req.params.postId);
          if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
          }
          const { __v, updatedAt, ...postInfo } = post._doc;
          res.status(200).json(postInfo);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      updateCommentInPost: async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const updatedPost = await Post.findOneAndUpdate(
      {
        _id: postId,
        'comments._id': commentId,
      },
      {
        $set: {
          'comments.$[comment].content': req.body.content,
        },
      },
      {
        new: true,
        arrayFilters: [{ 'comment._id': commentId }],
      }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post or comment not found.' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
addCommentToPost: async (req, res) => {
  try {
    const postId = req.params.postId;

    // Assuming req.body contains the necessary information for the new comment
    const newComment = {
      user: req.body.user,
      content: req.body.content,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
deleteCommentFromPost: async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

likePost: async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const isLiked = post.likes.some((like) => like.user === userId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        [isLiked ? '$pull' : '$push']: { likes: { user: userId, postId: postId } },
      },
      { new: true }
    );

    const action = isLiked ? 'disliked' : 'liked';
    res.status(200).json(`The post has been ${action}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

      
      
     
    
    }