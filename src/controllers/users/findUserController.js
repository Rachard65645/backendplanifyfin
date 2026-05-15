import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { userErrorMessage } from "../../../config/messages/error/userErrorMessage/userErrorMessage.js";
import { toNumber } from "../../services/convert/toNumber.js";

export const findUserController = async (req, res) => {
    try {
        const id = toNumber(req.params.id);
        const user = await prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                Name: true,
                email: true,
                telephone: true,
            }
        })
        if (!user) {
            return res.status(codeHttp.NOT_FOUND).json({ error: userErrorMessage.USER_NOT_FOUND });
        }
        return res.status(codeHttp.SUCCESS).json({ user: user });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}