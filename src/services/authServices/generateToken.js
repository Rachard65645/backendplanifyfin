import 'dotenv/config';
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { expiresInToken } from "../../utils/utils.js";
import jwt from 'jsonwebtoken';

export const generateToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        roles: user.roles,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresInToken });
    return token;
}