import { Post } from "../models/post.model.js";

class PostService {
    static async getOne(id) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getAll() {
        try {
            const posts = await Post.find();
            return posts;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async create(data) {
        try {
            const post = new Post(data);
            await post.save();
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async update(id, data, author) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }

            if (post.author.toString() !== author) {
                throw new Error("You are not authorized to update this post");
            }

            Object.keys(data).forEach((key) => {
                if (key === "author") {
                    return;
                }

                if (post[key] !== data[key]) {
                    post[key] = data[key];
                }
            });

            await post.save();
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async delete(id, author) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }

            if (post.author.toString() !== author) {
                throw new Error("You are not authorized to delete this post");
            }

            await post.delete();
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

export default PostService;
