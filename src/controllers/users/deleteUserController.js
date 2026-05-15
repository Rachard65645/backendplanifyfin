import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { userErrorMessage } from "../../../config/messages/error/userErrorMessage/userErrorMessage.js";
import { userSuccessMessage } from "../../../config/messages/success/userSuccessMessage/userSuccessMessage.js";
import { toNumber } from "../../services/convert/toNumber.js";

export const deleteUserController = async (req, res) => {
    try {
        const id = toNumber(req.params.id);
        const deletedUser = await prisma.users.delete({
            where: { id }
        });
        return res.status(codeHttp.SUCCESS).json({ message: userSuccessMessage.USER_DELETED_SUCCESSFULLY });
    } catch (err) {
        res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ error: userErrorMessage.INTERNAL_SERVER_ERROR, error: err.message });
    }
}