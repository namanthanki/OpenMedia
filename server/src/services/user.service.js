import { User } from "../models/user.model.js";
import { Friendship } from "../models/friendship.model.js";

class UserService {
    static async setupProfile(id, profilePicture, coverImage, bio) {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            user.profilePicture = profilePicture;
            user.coverPicture = coverImage;
            user.bio = bio;
            user.isProfileSetup = true;
            await user.save();
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async getUser(id) {
        try {
            const user = await User.findById(id).select([
                "username",
                "email",
                "dateOfBirth",
                "gender",
            ]);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async follow(userId, followId) {
        try {
            if (userId === followId) {
                throw new Error("You cannot follow yourself");
            }

            const user = await User.findById(userId);
            const followUser = await User.findById(followId);

            if (!user || !followUser) {
                throw new Error("User not found");
            }

            if (user.followings.includes(followId)) {
                throw new Error("You already follow this user");
            }

            user.followings.push(followId.toString());
            followUser.followers.push(userId.toString());

            await user.save();
            await followUser.save();

            return {
                user,
                followUser,
            };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async unfollow(userId, unfollowId) {
        try {
            if (userId === unfollowId) {
                throw new Error("You cannot unfollow yourself");
            }

            const user = await User.findById(userId);
            const unfollowUser = await User.findById(unfollowId);

            if (!user || !unfollowUser) {
                throw new Error("User not found");
            }

            if (!user.followings.includes(unfollowId)) {
                throw new Error("You are not following this user");
            }

            user.followings = user.followings.filter(
                (id) => id.toString() !== unfollowId,
            );
            unfollowUser.followers = unfollowUser.followers.filter(
                (id) => id.toString() !== userId,
            );

            await user.save();
            await unfollowUser.save();

            return {
                user,
                unfollowUser,
            };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async sendFriendRequest(senderId, receiverId) {
        try {
            if (senderId === receiverId) {
                throw new Error("You cannot send friend request to yourself");
            }

            const sender = await User.findById(senderId);
            const receiver = await User.findById(receiverId);

            if (!sender || !receiver) {
                throw new Error("User not found");
            }

            const pendingRequest = await Friendship.findOne({
                sender: senderId,
                receiver: receiverId,
                status: "pending",
            });

            if (pendingRequest) {
                throw new Error("Friend request already sent");
            }

            const friendship = new Friendship({
                sender: senderId,
                receiver: receiverId,
            });

            await friendship.save();

            return { friendship };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async acceptFriendRequest(senderId, receiverId) {
        try {
            const friendship = await Friendship.findOne({
                sender: senderId,
                receiver: receiverId,
                status: "pending",
            });

            if (!friendship) {
                throw new Error("Friend request not found");
            }

            friendship.status = "accepted";
            await friendship.save();

            return { friendship };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async rejectFriendRequest(senderId, receiverId) {
        try {
            const friendship = await Friendship.findOne({
                sender: senderId,
                receiver: receiverId,
                status: "pending",
            });

            if (!friendship) {
                throw new Error("Friend request not found");
            }

            friendship.status = "rejected";
            await friendship.save();

            return { friendship };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async cancelFriendRequest(senderId, receiverId) {
        try {
            const friendship = await Friendship.findOne({
                sender: senderId,
                receiver: receiverId,
                status: "pending",
            });

            if (!friendship) {
                throw new Error("Friend request not found");
            }

            await friendship.delete();

            return { friendship };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async removeFriend(userId, friendId) {
        try {
            const friendship = await Friendship.findOne({
                sender: userId,
                receiver: friendId,
                status: "accepted",
            });

            if (!friendship) {
                throw new Error("Friend not found");
            }

            await friendship.delete();

            return { friendship };
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async updateUser(id, data) {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }

            if (!data || Object.keys(data).length === 0) {
                throw new Error("No fields to update");
            }

            const allowedFieldsToUpdate = [
                "firstName",
                "lastName",
                "bio",
                "profilePicture",
                "coverPicture",
            ];

            allowedFieldsToUpdate.forEach((field) => {
                if (data[field] && user[field] !== data[field]) {
                    user[field] = data[field];
                }
            });

            await user.save();
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

export default UserService;
