import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 250,
            default: "",
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            trim: true,
            default: "",
        },
        coverPicture: {
            type: String,
            trim: true,
            default: "",
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        friendships: [
            {
                type: Schema.Types.ObjectId,
                ref: "Friendship",
            },
        ],
        blockedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        likedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        savedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likedComments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        sharedPosts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        conversations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Conversation",
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        refreshToken: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

// virtual function to create a full name
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// virtual function to create an age
userSchema.virtual("age").get(function () {
    const now = new Date();
    const dob = new Date(this.dateOfBirth);
    const diff = now - dob;
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

// virtual function to create an avatar
userSchema.virtual("avatar").get(function () {
    return this.profilePicture || "https://via.placeholder.com/150";
});

// virtual function to create a cover photo
userSchema.virtual("coverPhoto").get(function () {
    return this.coverPicture || "https://via.placeholder.com/400x200";
});

// virtual function to create a bio
userSchema.virtual("userBio").get(function () {
    return this.bio || "Hey there! I am using Social Media.";
});

// virtual function to create a followers count
userSchema.virtual("followersCount").get(function () {
    return this.followers.length;
});

// virtual function to create a followings count
userSchema.virtual("followingsCount").get(function () {
    return this.followings.length;
});

// virtual function to create a friends count
userSchema.virtual("friendsCount").get(function () {
    return this.friends.length;
});

// virtual function to create a posts count
userSchema.virtual("postsCount").get(function () {
    return this.posts.length;
});

// virtual function to create a liked posts count
userSchema.virtual("likedPostsCount").get(function () {
    return this.likedPosts.length;
});

// virtual function to create a saved posts count
userSchema.virtual("savedPostsCount").get(function () {
    return this.savedPosts.length;
});

// virtual function to create a comments count
userSchema.virtual("commentsCount").get(function () {
    return this.comments.length;
});

// virtual function to create a liked comments count
userSchema.virtual("likedCommentsCount").get(function () {
    return this.likedComments.length;
});

// virtual function to create a shared posts count
userSchema.virtual("sharedPostsCount").get(function () {
    return this.sharedPosts.length;
});

// virtual function to create a notifications count
userSchema.virtual("notificationsCount").get(function () {
    return this.notifications.length;
});

// virtual function to create a messages count
userSchema.virtual("messagesCount").get(function () {
    return this.messages.length;
});

// virtual function to create a conversations count
userSchema.virtual("conversationsCount").get(function () {
    return this.conversations.length;
});

// virtual function to create a online status
userSchema.virtual("onlineStatus").get(function () {
    return this.isOnline ? "online" : "offline";
});

// virtual function to create a last seen status
userSchema.virtual("lastSeenStatus").get(function () {
    return this.isOnline ? "online" : `last seen ${this.lastSeen}`;
});

export const User = mongoose.model("User", userSchema);
