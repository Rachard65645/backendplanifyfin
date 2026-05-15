import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { authSuccessMessages } from "../../../config/messages/success/authSuccessMesage/authSuccessMessage.js";
import { sendEmailverifyAccount } from "../../emails/verifyAccount.js";
import { generateExpirationDate, generateUniqueVerificationCode } from "../../utils/utils.js";

export const verifyAccountController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(codeHttp.NOT_FOUND).json({ message: authErrorMessages.USER_NOT_FOUND });
        }
        const verificationCode = await generateUniqueVerificationCode();
        const expirationDate = generateExpirationDate();
        await prisma.users.update({
            where: { email },
            data: {
                codeVerification: verificationCode,
                expiredAt: expirationDate
            }
        });
        await sendEmailverifyAccount(user.Name, user.email, verificationCode);
        return res.status(codeHttp.SUCCESS).json({ email: user.email, message: authSuccessMessages.EMAIL_VERIFICATION_SUCCESS });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ message: authErrorMessages.INTERNAL_SERVER_ERROR, error: err.message });
    }
}