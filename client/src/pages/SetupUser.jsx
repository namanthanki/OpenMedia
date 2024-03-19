import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const SetupUser = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const [formData, setFormData] = useState({
		profilePicture: "",
		coverPicture: "",
		bio: "",
	});

	const handleBioChange = (e) => {
		setFormData({ ...formData, bio: e.target.value });
	};

	const handleProfilePictureChange = (e) => {
		setFormData({ ...formData, profilePicture: e.target.files[0] });
	};

	const handleCoverPictureChange = (e) => {
		setFormData({ ...formData, coverPicture: e.target.files[0] });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const fdata = new FormData();
			fdata.append("profilePicture", formData.profilePicture);
			fdata.append("coverPicture", formData.coverPicture);
			fdata.append("bio", formData.bio);

			const response = await axiosPrivate.put("user/setup", fdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				navigate("/login");
			} else {
				console.error(response);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="auth-container">
			<div className="auth-wrapper">
				<h1 className="form-title">Profile Setup</h1>

				<form
					className="profile-setup-form"
					encType="multipart/form-data"
					onSubmit={handleSubmit}
				>
					<div className="form-row">
						<div className="form-cell">
							<label htmlFor="profilePicture">
								Profile Picture
							</label>
							<input
								type="file"
								id="profilePicture"
								name="profilePicture"
								onChange={handleProfilePictureChange}
							/>
						</div>
						<div className="form-cell">
							<label htmlFor="coverPicture">Cover Picture</label>
							<input
								type="file"
								id="coverPicture"
								name="coverPicture"
								onChange={handleCoverPictureChange}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-cell full">
							<label htmlFor="bio">Bio</label>
							<textarea
								id="bio"
								name="bio"
								onChange={handleBioChange}
							></textarea>
						</div>
					</div>
					<div className="form-row">
						<div className="form-cell full">
							<button className="submit-btn" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SetupUser;
