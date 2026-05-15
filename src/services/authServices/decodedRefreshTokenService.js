import 'dotenv/config';
import jwt from 'jsonwebtoken';
export const decodedRefreshTokenService = async (refreshTokenBody) => {
    const decodedRefreshToken =  jwt.verify(refreshTokenBody, process.env.JWT_SECRET);
    return decodedRefreshToken;
}