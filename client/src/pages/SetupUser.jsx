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
		<div className="auth-container flex justify-center items-center h-screen">
			<div className="auth-wrapper flex flex-col justify-center items-center bg-formColor shadow rounded-md p-8 h-fit w-1/3 gap-2">
				<h1 className="form-title text-3xl text-accent font-semibold">Profile Setup</h1>

				<form
					className="profile-setup-form flex flex-col mt-4 gap-3 w-full"
					encType="multipart/form-data"
					onSubmit={handleSubmit}
				>
					<div className="form-row flex gap-4">
						<div className="form-cell flex-1">
							<label htmlFor="profilePicture block text-md font-light text-primary">
								Profile Picture
							</label>
							<input
								type="file"
								id="profilePicture"
								name="profilePicture"
								onChange={handleProfilePictureChange}
							/>
						</div>
						<div className="form-cell flex-1">
							<label htmlFor="coverPicture block text-md font-light text-primary">Cover Picture</label>
							<input
								type="file"
								id="coverPicture"
								name="coverPicture"
								onChange={handleCoverPictureChange}
							/>
						</div>
					</div>
					<div className="form-row flex gap-4">
						<div className="form-cell full flex-1">
							<label className="block text-md font-light text-primary" htmlFor="bio">Bio</label>
							<textarea
								className=" w-full p-2 bg-transparent rounded-md border border-accent outline outline-accent outline-0 focus:outline-1 transition-all shadow-sm sm:text-sm"
								id="bio"
								name="bio"
								onChange={handleBioChange}
							></textarea>
						</div>
					</div>
					<div className="form-row flex">
						<div className="form-cell full flex-1 w-full">
							<button className="submit-btn block my-4 w-full py-2 text-accent font-medium cursor-pointer border-2 border-accent rounded-full text-center hover:bg-accent hover:text-primary hover:transition-colors" type="submit">
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
