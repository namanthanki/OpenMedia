import AuthService from "../services/auth.service.js";

class AuthController {
    static async register(req, res) {
        try {
            const { firstName, lastName, username, email, password, dateOfBirth, gender } = req.body;
            const user = await AuthService.register(
                firstName,
                lastName,
                username,
                email,
                password,
                dateOfBirth,
                gender,
            );

            if (user instanceof Error) {
                return res.status(400).json({ message: user.message });
            }

            if (user === null || user === undefined) {
                return res.status(500).json({ message: "Error occurred while creating the user" });
            }

            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Error occurred while creating the user", error });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);

            if (user instanceof Error) {
                return res.status(400).json({ message: user.message });
            }

            if (user === null || user === undefined) {
                return res.status(500).json({ message: "Error occurred while logging in" });
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Error occurred while logging in", error });
        }
    }
}

export default AuthController;
