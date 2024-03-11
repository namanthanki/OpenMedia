import vine from "@vinejs/vine";

export const setupProfileSchema = vine.object({
    profilePicture: vine.string().minLength(5),
    coverPicture: vine.string().minLength(5),
    bio: vine.string().minLength(1).maxLength(1000),
});
