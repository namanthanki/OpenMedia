import { useState } from "react";
import "./styles/search-modal.css";

const SearchModal = ({ open, onClose }) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setSearchQuery("");
		onClose();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchQuery("");
		onClose();
	};

	return (
		<div className={`search-modal ${open ? "active" : ""}`}>
			<div className="search-modal-content">
				<h2 className="search-modal-header">Search</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
                            type="text"
							id="searchQuery"
							name="searchQuery"
							value={searchQuery}
							placeholder="What are you looking for?"
							onChange={(e) => setSearchQuery(e.target.value)}
							required
						/>
					</div>
					<button className="search-btn" type="submit">
						Search
					</button>
				</form>
				<button className="search-close-btn" onClick={handleClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default SearchModal;
