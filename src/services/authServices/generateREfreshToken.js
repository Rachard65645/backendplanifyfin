import 'dotenv/config';
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { expiresInRefreshToken } from '../../utils/utils.js';
import jwt from 'jsonwebtoken';

export const generateRefreshToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles,
    };
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresInRefreshToken });
    return refreshToken;
}