// import { useState } from "react";
// // import "./styles/create-post-modal.css";
// import PostAuthorHeader from "./PostAuthorHeader";
// import { usePost } from "../hooks/usePost";
// import { useUser } from "../hooks/useUser";

// const CreatePostModal = ({ open, onClose }) => {
// 	const [postContent, setPostContent] = useState("");
// 	const [postImage, setPostImage] = useState(null);
// 	const { createPost } = usePost();
// 	const { user } = useUser();

// 	const handleClose = (e) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setPostContent("");
// 		setPostImage(null);
// 		onClose();
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const formData = new FormData();
// 			formData.append("content", postContent);
// 			formData.append("image", postImage);
// 			await createPost(formData);
// 		} catch (error) {
// 			console.error(error);
// 		} finally {
// 			setPostContent("");
// 			onClose();
// 		}
// 	};

// 	const handleImageChange = (e) => {
// 		setPostImage(e.target.files[0]);
// 	};

// 	return (
// 		<div className="modal-wrapper">
// 			<div className={`modal ${open ? "active" : ""}`}>
// 				<div className="modal-content">
// 					<h2 className="create-post-header">Create Post</h2>
// 					<PostAuthorHeader
// 						authorImage={user?.profilePicture}
// 						authorName={`${user?.firstName} ${user?.lastName}`}
// 						authorUsername={user?.username}
// 					/>
// 					<form encType="multipart/form-data" onSubmit={handleSubmit}>
// 						<div className="form-group">
// 							<textarea
// 								id="postContent"
// 								name="postContent"
// 								value={postContent}
// 								placeholder="What would you like to share?"
// 								onChange={(e) => setPostContent(e.target.value)}
// 								required
// 							/>
// 						</div>
// 						<div className="form-group">
// 							<input
// 								type="file"
// 								name="postImage"
// 								id="postImage"
// 								onChange={(e) => handleImageChange(e)}
// 								required
// 							/>
// 						</div>
// 						{postImage && (
// 							<div className="form-group">
// 								<img
// 									className="post-image-preview"
// 									src={URL.createObjectURL(postImage)}
// 									alt="Post Preview"
// 								/>
// 							</div>
// 						)}
// 						<button className="post-btn" type="submit">
// 							Post
// 						</button>
// 					</form>
// 					<button className="close-btn" onClick={handleClose}>
// 						Close
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CreatePostModal;

import { useState } from "react";
import PostAuthorHeader from "./PostAuthorHeader";
import { usePost } from "../hooks/usePost";
import { useUser } from "../hooks/useUser";

const CreatePostModal = ({ open, onClose }) => {
	const [postContent, setPostContent] = useState("");
	const [postImage, setPostImage] = useState(null);
	const { createPost } = usePost();
	const { user } = useUser();

	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setPostContent("");
		setPostImage("");
		onClose();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData();
			formData.append("content", postContent);
			formData.append("image", postImage);
			await createPost(formData);
		} catch (error) {
			console.error(error);
		} finally {
			setPostContent("");
			onClose();
		}
	};

	const handleImageChange = (e) => {
		setPostImage(e.target.files[0]);
	};

	return (
		<div className={`fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center ${open ? 'block' : 'hidden'}`}>
			<div className="modal-content w-1/3 bg-formColor rounded-lg p-16">
				<h2 className="create-post-header text-2xl text-center font-bold text-accent-color mb-5">Create Post</h2>
				<PostAuthorHeader
					authorImage={user?.profilePicture}
					authorName={`${user?.firstName} ${user?.lastName}`}
					authorUsername={user?.username}
				/>
				<form encType="multipart/form-data" onSubmit={handleSubmit} className="mt-8 space-y-4">
					<textarea
						id="postContent"
						name="postContent"
						value={postContent}
						placeholder="What would you like to share?"
						onChange={(e) => setPostContent(e.target.value)}
						required
						className="w-full h-40 px-4 py-2 rounded-lg bg-anotherBlack focus:outline-none focus:ring focus:border-accent-color"
					/>
					<label className="block font-light text-sm" htmlFor="postImage">Select Post Image</label>
					<input
						type="file"
						name="postImage"
						id="postImage"
						onChange={(e) => handleImageChange(e)}
					/>
					{postImage && (
						<div className="form-group">
							<img
								className="post-image-preview w-24 h-auto object-cover rounded-lg"
								src={URL.createObjectURL(postImage)}
								alt="Post Preview"
							/>
						</div>
					)}
					<button className="post-btn w-full py-2 rounded-lg bg-accent text-white font-semibold transition duration-300 hover:bg-accent-color-dark" type="submit">
						Post
					</button>
				</form>
				<button className="close-btn mt-2 w-full py-2 rounded-lg bg-gray-800 text-white font-semibold transition duration-300 hover:bg-gray-700" onClick={handleClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default CreatePostModal;
