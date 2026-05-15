import joi from "joi";
import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { password_regex } from "../../utils/utils.js";

export const updatePasswordRequest = (req, res, next) => {
    const schema = joi.object({
        codeVerification: joi.string().length(6).required().messages({
            'string.empty': 'Le code de vérification est requis.',
            'string.length': 'Le code de vérification doit contenir 6 caractères.',
        }),
        newPassword: joi.string().pattern(password_regex)
            .min(8)
            .required()
            .messages({
                'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères.',
                'string.pattern.base': 'Le nouveau mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.',
                'string.empty': 'Le nouveau mot de passe est requis.',
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