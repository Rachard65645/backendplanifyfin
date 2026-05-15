import express from "express";
import { RegisterController } from "../../controllers/auth/registerController.js";
import { LoginController } from "../../controllers/auth/loginController.js";
import { refreshTokenController } from "../../controllers/auth/refreshTokenController.js";
import { verifyAccountController } from "../../controllers/auth/verifyAccountController.js";
import { updatePasswordController } from "../../controllers/auth/updatePasswordController.js";
const authRouter = express.Router();

authRouter.post('/register', RegisterController);
authRouter.post('/login', LoginController);
authRouter.post('/refresh-token', refreshTokenController);
authRouter.post('/verify-account', verifyAccountController);
authRouter.post('/update-password', updatePasswordController);

export default authRouter;