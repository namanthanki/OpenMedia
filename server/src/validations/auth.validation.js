import vine from "@vinejs/vine";

export const registerSchema = vine.object({
    username: vine.string().minLength(3).maxLength(32),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(64).confirmed(),
    firstName: vine.string().minLength(3).maxLength(32).required(),
    lastName: vine.string().minLength(3).maxLength(32).required(),
    profilePicture: vine.string().optional(),
    coverPicture: vine.string().optional(),
});
