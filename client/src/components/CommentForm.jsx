import { useState } from "react";
import { MdSend } from "react-icons/md";
import { axiosPrivate } from "../api/axios";

const CommentForm = ({ postId, postData, setComments }) => {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        try {
            const response = await axiosPrivate.post(
                `/post/${postId}/comment`,
                { content: text }
            );
            if (response.data) {
                response.data.comment.authorProfilePicture = `http://localhost:3000/${
                    response.data.comment.authorProfilePicture
                        .split("\\")
                        .join("/")
                        .split("public/")[1]
                }`;

                setComments((prev) => [...prev, response.data.comment]);
                postData.comments.push(response.data.comment._id);
                postData.commentsCount = response.data.post.commentsCount;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setText("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="comment-form flex justify-between items-center gap-4"
        >
            <textarea
                className="comment-input w-full max-h-11 p-2 text-primary bg-anotherBlack border border-accent rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                value={text}
                onChange={handleChange}
                placeholder="Write a comment..."
                required
            ></textarea>
            <MdSend
                type="submit"
                className="comment-submit text-3xl cursor-pointer"
                onClick={handleSubmit}
            />
        </form>
    );
};

export default CommentForm;
