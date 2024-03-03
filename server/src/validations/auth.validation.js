import vine from "@vinejs/vine";

export const registerSchema = vine.object({
    firstName: vine.string().minLength(2).maxLength(50),
    lastName: vine.string().minLength(2).maxLength(50),
    username: vine.string().maxLength(50),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(64).confirmed({
        confirmationField: "confirmPassword",
    }),
    dateOfBirth: vine.date({
        format: "YYYY-MM-DD",
    }),
    gender: vine.string().in(["m", "f"]).minLength(1).maxLength(1),
});

export const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(64),
});

export const forgotPasswordSchema = vine.object({
    oldPassword: vine.string().minLength(8).maxLength(64),
    newPassword: vine.string().minLength(8).maxLength(64).confirmed({
        confirmationField: "confirmNewPassword",
    }),
});
