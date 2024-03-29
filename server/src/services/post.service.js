import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

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

    static async getAllByAuthor(author) {
        try {
            const posts = await Post.find({ author: author });
            return posts;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getFeedPosts(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            const posts = await Post.find({
                author: { $in: user.followings },
            }).sort({ createdAt: -1 });
            return posts;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getProfilePosts(author) {
        try {
            const posts = await Post.find({ author: author }).sort({
                createdAt: -1,
            });
            return posts;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getComments(id) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }
            const comments = await Comment.find({ postId: id }).sort({
                createdAt: -1,
            });
            return comments;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async create(data) {
        try {
            const post = new Post(data);
            await post.save();

            const author = await User.findById(post.author);
            author.posts.push(post._id.toString());

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

    static async like(id, author) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }

            if (post.likes.includes(author.toString())) {
                throw new Error("You have already liked this post");
            }

            post.likes.push(author);
            post.likesCount = post.likesCount + 1;
            await post.save();
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async unlike(id, author) {
        try {
            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }

            if (!post.likes.includes(author.toString())) {
                throw new Error("You have not liked this post");
            }

            post.likes = post.likes.filter(
                (like) => like.toString() !== author.toString(),
            );
            post.likesCount = post.likesCount - 1;
            await post.save();
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async comment(id, content, authorId) {
        try {
            const author = await User.findById(authorId);
            if (!author) {
                throw new Error("User not found");
            }

            const post = await Post.findById(id);
            if (!post) {
                throw new Error("Post not found");
            }

            const authorName = `${author.firstName} ${author.lastName}`;
            const commentData = {
                author: author._id.toString(),
                authorName: authorName,
                authorUsername: author.username,
                authorProfilePicture: author.profilePicture,
                content: content,
                postId: post._id.toString(),
            };
            const comment = new Comment(commentData);
            await comment.save();

            post.comments.push(comment._id.toString());
            post.commentsCount = post.commentsCount + 1;
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

            const authorData = await User.findById(author);
            authorData.posts = authorData.posts.filter(
                (postId) => postId.toString() !== id,
            );
            
            return post;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

export default PostService;
