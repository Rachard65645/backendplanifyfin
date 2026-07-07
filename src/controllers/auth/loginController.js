import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { authSuccessMessages } from "../../../config/messages/success/authSuccessMesage/authSuccessMessage.js";
import { generateRefreshToken } from "../../services/authServices/generateREfreshToken.js";
import { generateToken } from "../../services/authServices/generateToken.js";
import { verifyPasswordService } from "../../services/passwordService/verifyPasswordService.js";

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(codeHttp.UNAUTHORIZED).json({ message: authErrorMessages.INVALID_CREDENTIALS });
        }
        const isPasswordValid = await verifyPasswordService(password, user.password);
        if (!isPasswordValid) {
            return res.status(codeHttp.UNAUTHORIZED).json({ message: authErrorMessages.INVALID_CREDENTIALS });
        }


        const token = await generateToken(user);
        const refreshToken = await generateRefreshToken(user);
        return res.status(codeHttp.SUCCESS).json({
            token, refreshToken, message: authSuccessMessages.LOGIN_SUCCESS, user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ message: authErrorMessages.LOGIN_FAILED, error: err.message });
    }
}

