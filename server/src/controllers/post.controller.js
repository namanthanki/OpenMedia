import PostService from "../services/post.service.js";

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

    static async create(req, res) {
        try {
            const data = req.body;
            const post = await PostService.create(data);
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
