import { saltRounds } from "../../utils/utils.js";
import bcrypt from "bcryptjs";

export const hasherPasswordService = async (password) => {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
}