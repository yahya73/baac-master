
const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    user: {
      type: String, // Assuming user is identified by username
      required: true,
    },
    UserImage:{

      type: String,
      reauired:false,
    },

    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Comment", commentSchema)

  const likeSchema = new mongoose.Schema({
    user: {
      type: String, // Assuming user is identified by username
      required: true,
    },
    postId: {
      type:String,
      required: true,
    },
    
  });
  
  module.exports = mongoose.model("Like", likeSchema)

  
 
  const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: false },
        PostContent: { type: String, required: true },
        PostPicture: {
            type: String,
            require: false
        },
        comments: [commentSchema],
        likes: [likeSchema],
        userImage: {
            type: String,
            required: false,
        },
        userId: {
            type: String,
            required: true,
        },
        userName: {
          type: String,
          required: true,
      },
        type: {
            type: Number,
            enum: [0, 1], // 0 for regular posts, 1 for reels
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
