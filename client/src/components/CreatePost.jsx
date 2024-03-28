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
			<div className="create-post flex items-center justify-start gap-5 px-32 pl-6 h-14 bg-formColor rounded-md cursor-pointer" onClick={handleOpenModal}>
				<img className="create-post-author w-10 h-10 rounded-full cursor-pointer object-cover" src={authorImage} alt={`${authorUsername}'s Image`} />
				<div className="create-post-text text-md font-light cursor-pointer">
					Share your thoughts...
				</div>
				<CreatePostModal open={openModal} onClose={handleCloseModal} />
			</div>
		</div>
	);
};

export default CreatePost;
