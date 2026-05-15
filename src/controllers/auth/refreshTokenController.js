import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { authSuccessMessages } from "../../../config/messages/success/authSuccessMesage/authSuccessMessage.js";
import { decodedRefreshTokenService } from "../../services/authServices/decodedRefreshTokenService.js";
import { generateRefreshToken } from "../../services/authServices/generateREfreshToken.js";
import { generateToken } from "../../services/authServices/generateToken.js";

export const refreshTokenController = async (req, res) => {
    try {
        const { refreshTokenBody } = req.body;
        if (!refreshTokenBody) {
            return res.status(codeHttp.NOT_FOUND).json({ message: authErrorMessages.REFRESH_TOKEN_NOT_PROVIDED });
        }
        const decodedRefreshToken = await decodedRefreshTokenService(refreshTokenBody);

        const user = await prisma.users.findUnique({
            where: { id: decodedRefreshToken.id }
        });

        if (!user) {
            return res.status(codeHttp.UNAUTHORIZED).json({ message: authErrorMessages.INVALID_CREDENTIALS });
        }

        const token = await generateToken(user);
        const refreshToken = await generateRefreshToken(user);
        return res.status(codeHttp.SUCCESS).json({ token, refreshToken, message: authSuccessMessages.LOGIN_SUCCESS });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ message: authErrorMessages.LOGIN_FAILED, error: err.message });
    }
}