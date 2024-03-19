import vine from "@vinejs/vine";

export const createPostSchema = vine.object({
    author: vine.string().minLength(1),
    content: vine.string().minLength(1).maxLength(500),
    image: vine.string().optional(),
});
