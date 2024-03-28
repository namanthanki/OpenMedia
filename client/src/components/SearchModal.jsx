// import { useState } from "react";
// // import "./styles/search-modal.css";

// const SearchModal = ({ open, onClose }) => {
// 	const [searchQuery, setSearchQuery] = useState("");

// 	const handleClose = (e) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setSearchQuery("");
// 		onClose();
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setSearchQuery("");
// 		onClose();
// 	};

// 	return (
// 		<div className={`search-modal ${open ? "active" : ""}`}>
// 			<div className="search-modal-content">
// 				<h2 className="search-modal-header">Search</h2>
// 				<form onSubmit={handleSubmit}>
// 					<div className="form-group">
// 						<input
//                             type="text"
// 							id="searchQuery"
// 							name="searchQuery"
// 							value={searchQuery}
// 							placeholder="What are you looking for?"
// 							onChange={(e) => setSearchQuery(e.target.value)}
// 							required
// 						/>
// 					</div>
// 					<button className="search-btn" type="submit">
// 						Search
// 					</button>
// 				</form>
// 				<button className="search-close-btn" onClick={handleClose}>
// 					Close
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default SearchModal;

import { useState } from "react";

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
        <div className={`search-modal fixed top-0 left-0 w-full h-full flex justify-center items-center ${open ? "block" : "hidden"} bg-black bg-opacity-70 z-50`}>
            <div className="search-modal-content bg-gray-900 p-12 rounded-lg w-96">
                <h2 className="search-modal-header text-2xl font-bold text-accent-color text-center">Search</h2>
                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="form-group">
                        <input
                            type="text"
                            id="searchQuery"
                            name="searchQuery"
                            value={searchQuery}
                            placeholder="What are you looking for?"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button className="search-btn w-full mt-4 bg-accent text-white py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80" type="submit">
                        Search
                    </button>
                </form>
                <button className="search-close-btn w-full mt-4 bg-gray-600 text-white py-2 rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default SearchModal;
