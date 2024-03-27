import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

// import "./styles/create-post.css";

const CreatePost = ({ authorImage, authorUsername }) => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	}

	const handleCloseModal = () => {
		setOpenModal(false);
	}

	return (
		<div>
			<div className="create-post" onClick={handleOpenModal}>
				<img className="create-post-author" src={authorImage} alt={`${authorUsername}'s Image`} />
				<div className="create-post-text">
					Share your thoughts...
				</div>
				<CreatePostModal open={openModal} onClose={handleCloseModal} />
			</div>
		</div>
	);
};

export default CreatePost;
