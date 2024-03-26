import vine from "@vinejs/vine";
import PostService from "../services/post.service.js";
import { createPostSchema } from "../validations/post.validation.js";

class PostController {
    static async getOne(req, res) {
        const id = req.params.id;
        try {
            const post = await PostService.getOne(id);
            return res.status(200).json({
                post,
                message: "Post retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving post",
                error: error.message,
            });
        }
    }

    static async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            return res.status(200).json({
                posts,
                message: "Posts retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving posts",
                error: error.message,
            });
        }
    }

    static async getFeedPosts(req, res) {
        const author = req.user.id;
        try {
            const posts = await PostService.getFeedPosts(author);
            return res.status(200).json({
                posts,
                message: "Feed posts retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving feed posts",
                error: error.message,
            });
        }
    }

    static async getProfilePosts(req, res) {
        const author = req.params.id;
        try {
            const posts = await PostService.getProfilePosts(author);
            return res.status(200).json({
                posts,
                message: "Profile posts retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving profile posts",
                error: error.message,
            });
        }
    }

    static async getComments(req, res) {
        const id = req.params.id;
        try {
            const comments = await PostService.getComments(id);
            return res.status(200).json({
                comments,
                message: "Comments retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while retrieving comments",
                error: error.message,
            });
        }
    }

    static async create(req, res) {
        const author = req.user.id.toString();
        const { content } = req.body;
        const image = req.file?.path;
        const data = { author, content, image };
        try {
            const validator = vine.compile(createPostSchema);
            const output = await validator.validate(data);

            const post = await PostService.create(output);
            return res.status(201).json({
                post,
                message: "Post created successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while creating the post",
                error: error.message,
            });
        }
    }

    static async update(req, res) {
        const id = req.params.id;
        const data = req.body;
        const author = req.user.id;
        try {
            const post = await PostService.update(id, data, author);
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            return res.status(200).json({
                post,
                message: "Post updated successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while updating the post",
                error: error.message,
            });
        }
    }

    static async like(req, res) {
        const id = req.params.id;
        const author = req.user.id;
        try {
            const post = await PostService.like(id, author);
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            return res.status(200).json({
                post,
                message: "Post liked successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while liking the post",
                error: error.message,
            });
        }
    }

    static async unlike(req, res) {
        const id = req.params.id;
        const author = req.user.id;
        try {
            const post = await PostService.unlike(id, author);
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            return res.status(200).json({
                post,
                message: "Post unliked successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while unliking the post",
                error: error.message,
            });
        }
    }

    static async comment(req, res) {
        const id = req.params.id;
        const author = req.user.id;
        const { content } = req.body;
        try {
            const post = await PostService.comment(id, content, author);
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            return res.status(200).json({
                post,
                message: "Comment added successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while adding comment to the post",
                error: error.message,
            });
        }
    }

    static async delete(req, res) {
        const id = req.params.id;
        const author = req.user.id;
        try {
            const post = await PostService.delete(id, author);
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                });
            }

            return res.status(200).json({
                post,
                message: "Post deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while deleting the post",
                error: error.message,
            });
        }
    }
}

export default PostController;
