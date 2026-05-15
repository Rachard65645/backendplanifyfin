import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";
import { userSuccessMessage } from "../../../config/messages/success/userSuccessMessage/userSuccessMessage.js";

export const updateUser = async (req, res) => {
    try {
        const id = req.user.id
        const { firstName, lastName, email, pays, region, ville, adresse, telephone } = req.body;
        const user = await prisma.users.findFirst({ where: { id } });
        if (!user) {
            return res.status(codeHttp.NOT_FOUND).json({ error: userErrorMessage.USER_NOT_FOUND });
        }
        const updatedUser = await prisma.users.update({
            where: { id },
            data: { firstName, lastName, email, pays, region, ville, adresse, telephone },
            select: {
                id: true,
                Name: true,
                email: true,
                telephone: true
            }
        })
        return res.status(codeHttp.SUCCESS).json({ user: updatedUser, message: userSuccessMessage.USER_UPDATED_SUCCESSFULLY });
    } catch (err) {
        return res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ error: userErrorMessage.INTERNAL_SERVER_ERROR });
    }
}