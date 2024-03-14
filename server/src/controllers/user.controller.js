import UserService from "../services/user.service.js";
import vine, { errors } from "@vinejs/vine";
import { setupProfileSchema } from "../validations/user.validation.js";

class UserController {
    static async setupProfile(req, res) {
        const id = req.user.id;
        const data = req.body;
        try {
            const validator = vine.compile(profileSetupSchema);
            const output = await validator.validate(data);
            const { profilePicture, coverImage, bio } = output;

            const user = await UserService.setupProfile(
                id,
                profilePicture,
                coverImage,
                bio,
            );
            if (user) {
                return res.status(200).json({
                    user,
                    message: "Profile setup successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ message: error.messages });
            }

            res.status(500).json({
                message: "Error occurred while setting up the profile",
                error: error.message,
            });
        }
    }

    static async getUser(req, res) {
        const id = req.user.id;
        try {
            const user = await UserService.getUser(id);
            if (user) {
                return res.status(200).json({
                    user,
                    message: "User retrieved successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while creating the user",
                error: error.message,
            });
        }
    }

    static async follow(req, res) {
        const userId = req.user.id;
        const followId = req.params.id;
        try {
            const user = await UserService.follow(userId, followId);
            if (user) {
                return res.status(200).json({
                    user,
                    message: "User followed successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while following the user",
                error: error.message,
            });
        }
    }

    static async unfollow(req, res) {
        const userId = req.user.id;
        const unfollowId = req.params.id;
        try {
            const user = await UserService.unfollow(userId, unfollowId);
            if (user) {
                return res.status(200).json({
                    user,
                    message: "User unfollowed successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while unfollowing the user",
                error: error.message,
            });
        }
    }

    static async sendFriendRequest(req, res) {
        const userId = req.user.id;
        const friendId = req.params.id;
        try {
            const friendship = await UserService.sendFriendRequest(
                userId,
                friendId,
            );
            if (friendship) {
                return res.status(200).json({
                    friendship,
                    message: "Friend request sent successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while sending the friend request",
                error: error.message,
            });
        }
    }

    static async acceptFriendRequest(req, res) {
        const userId = req.user.id;
        const friendId = req.params.id;
        try {
            const friendship = await UserService.acceptFriendRequest(
                userId,
                friendId,
            );
            if (friendship) {
                return res.status(200).json({
                    friendship,
                    message: "Friend request accepted successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while accepting the friend request",
                error: error.message,
            });
        }
    }

    static async rejectFriendRequest(req, res) {
        const userId = req.user.id;
        const friendId = req.params.id;
        try {
            const friendship = await UserService.rejectFriendRequest(
                userId,
                friendId,
            );
            if (friendship) {
                return res.status(200).json({
                    friendship,
                    message: "Friend request rejected successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while rejecting the friend request",
                error: error.message,
            });
        }
    }

    static async cancelFriendRequest(req, res) {
        const userId = req.user.id;
        const friendId = req.params.id;
        try {
            const friendship = await UserService.cancelFriendRequest(
                userId,
                friendId,
            );
            if (friendship) {
                return res.status(200).json({
                    friendship,
                    message: "Friend request cancelled successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while cancelling the friend request",
                error: error.message,
            });
        }
    }

    static async unfriend(req, res) {
        const userId = req.user.id;
        const friendId = req.params.id;
        try {
            const friendship = await UserService.removeFriend(userId, friendId);
            if (friendship) {
                return res.status(200).json({
                    friendship,
                    message: "Unfriended successfully",
                });
            }
            return res.status(404).json({
                message: "User not found",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while unfriending",
                error: error.message,
            });
        }
    }

    static async updateUser(req, res) {
        const id = req.user.id;
        const data = req.body;
        try {
            const user = await UserService.updateUser(id, data);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.status(200).json({
                user,
                message: "User updated successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while updating the user",
                error: error.message,
            });
        }
    }

    static async deleteUser(req, res) {
        const id = req.user.id;
        try {
            const user = await UserService.deleteUser(id);
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            return res.status(200).json({
                user,
                message: "User deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred while deleting the user",
                error: error.message,
            });
        }
    }
}

export default UserController;
