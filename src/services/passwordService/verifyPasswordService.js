import bcrypt from "bcryptjs";

export const verifyPasswordService = async (password, passwordHash) => {
    const isMatch = await bcrypt.compare(password, passwordHash);
    return isMatch;
}