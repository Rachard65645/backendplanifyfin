import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { authSuccessMessages } from "../../../config/messages/success/authSuccessMesage/authSuccessMessage.js";
import { hasherPasswordService } from "../../services/passwordService/hasherPasswordService.js";

export const updatePasswordController = async (req, res) => {
    try {
        const { codeVerification, newPassword } = req.body;
        const user = await prisma.users.findFirst({
            where: { codeVerification }
        })
        if (!user) {
            return res.status(codeHttp.NOT_FOUND).json({ message: authErrorMessages.USER_NOT_FOUND });
        }

        const passwordHash = await hasherPasswordService(newPassword);
        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: passwordHash,
                codeVerification: null,
                expiredAt: null
            }
        });
        return res.status(codeHttp.SUCCESS).json({ message: authSuccessMessages.PASSWORD_UPDATE_SUCCESS });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ message: authErrorMessages.INTERNAL_SERVER_ERROR , error: err.message });
    }
}