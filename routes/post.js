// post.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); 

// Create a new post
router.post('/', postController.createPost);

// Update a post by ID
router.put('/:postId', postController.updatePost);

// Delete a post by ID
router.delete('/:postId', postController.deletePost);

// Get all posts
router.get('/all', postController.getAllPosts);
router.get('/reels', postController.getAllPostsByType);



// Get a post by ID
router.get('/:postId', postController.getPostById);

router.put('/:postId/comments/:commentId',postController.updateCommentInPost)
router.post('/:postId/comments', postController.addCommentToPost);
router.delete('/:postId/comments/:commentId', postController.deleteCommentFromPost);
router.put('/:postId/:iuserId/like', postController.likePost);

module.exports = router;
