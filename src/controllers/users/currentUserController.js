import { codeHttp } from "../../../config/codeHttp/codeHttp.js"
import { prisma } from "../../../config/db/client.js"
import { userErrorMessage } from "../../../config/messages/error/userErrorMessage/userErrorMessage.js"

export const getCurrentUser = async (req, res) => {

    try {
        const user_id = req.user.id
        const user = await prisma.users.findFirst({
            where: { id: user_id },
            select: {
                id: true,
                Name: true,
                email: true,
                telephone: true,
                roles: true
            }
        })
        if (!user) {
            res.status(codeHttp.UNAUTHORIZED).json({ error: userErrorMessage.USER_NOT_FOUND })
        }
        req.user = user
        return res.status(codeHttp.SUCCESS).json({ user: user })
    } catch (err) {
        res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ error: err.message })
    }
}