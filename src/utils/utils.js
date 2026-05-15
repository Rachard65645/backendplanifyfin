import { prisma } from "../../config/db/client.js";

export const saltRounds = 10;
export const expiresInToken = '6h';
export const expiresInRefreshToken = '7h';
export const password_regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})')
export const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
export const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Content',
    'Accept',
    'Content-Type',
    'Authorization',
]
export const role = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    Entreprise: 'ROLE_ENTREPRISE'
}
export const typeComptes = [
    'ENTREPRISE',
    'USER',
    'ADMIN'
]
export const getRequest = {
    BEARER: 'bearer',
    AUTHORIZATION: 'authorization',
    USER: 'user',
    STRING: 'string'
}
export const generateUniqueVerificationCode = async () => {
    const MAX_ATTEMPTS = 5;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const existingCode = await prisma.users.findFirst({
            where: {
                codeVerification: code
            }
        });

        if (!existingCode) {
            return code;
        }
    }

    throw new Error("Impossible de générer un code unique");
};
export const generateExpirationDate = (minutes = 10) => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
    return expirationDate;
};


