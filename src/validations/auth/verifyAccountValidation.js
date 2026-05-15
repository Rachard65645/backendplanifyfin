import joi from "joi";
import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
export const verifyAccountRequest = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().max(191).required().messages({
            'string.email': 'L\'adresse e-mail doit être valide.',
            'string.empty': 'L\'adresse e-mail est requise.',
        }),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(codeHttp.BAD_REQUEST).json({
            error: error.details.map(d => d.message)
        });
    }
    next();
}