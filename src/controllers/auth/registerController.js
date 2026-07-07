import { prisma } from '../../../config/db/client.js';
import { generateToken } from '../../services/authServices/generateToken.js';
import { authSuccessMessages } from '../../../config/messages/success/authSuccessMesage/authSuccessMessage.js';
import { generateRefreshToken } from '../../services/authServices/generateREfreshToken.js';
import { authErrorMessages } from '../../../config/messages/error/authErrorMessage/authErrorMessage.js';
import { codeHttp } from '../../../config/codeHttp/codeHttp.js';
import { hasherPasswordService } from '../../services/passwordService/hasherPasswordService.js';
import { role, typeComptes } from '../../utils/utils.js';

export const RegisterController = async (req, res) => {
    try {
        const { email, password, immatriculation } = req.body;

        const user = await prisma.users.findUnique({
            where: { email }
        });


        if (user) {
            return res.status(codeHttp.NOT_FOUND).json({ message: authErrorMessages.USER_ALREADY_EXISTS });
        }

        const passwordHash = await hasherPasswordService(password);



        const newUser = await prisma.users.create({
            data: {
                email,
                password: passwordHash,
                immatriculation,
            },
        })

        const token = await generateToken(newUser);
        const refreshToken = await generateRefreshToken(newUser);
        return res.status(codeHttp.CREATED).json({ user: newUser, token, refreshToken, message: authSuccessMessages.REGISTRATION_SUCCESS });

    } catch (err) {
        console.error(err);
        res.status(codeHttp.INTERNAL_SERVER_ERROR).json({ error: authErrorMessages.REGISTRATION_FAILED });
    }
}