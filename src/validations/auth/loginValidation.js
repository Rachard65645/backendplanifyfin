import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { authErrorMessages } from "../../../config/messages/error/authErrorMessage/authErrorMessage.js";
import { password_regex } from "../../utils/utils.js";
import joi from "joi";

export const loginRequest = (req, res, next) => {
    const login = joi.object({
        email: joi.string().email().max(191).required().messages({
            'string.email': authErrorMessages.INVALID_CREDENTIALS,
            'string.empty': authErrorMessages.INVALID_CREDENTIALS,
        }),

        password: joi.string()
            .pattern(password_regex)
            .min(8)
            .required()
            .messages({
                'string.min': authErrorMessages.INVALID_CREDENTIALS,
                'string.pattern.base': authErrorMessages.INVALID_CREDENTIALS,
                'string.empty': authErrorMessages.INVALID_CREDENTIALS,
            }),
    });

    const { error } = login.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(codeHttp.BAD_REQUEST).json({
            error: error.details.map(d => d.message)
        });
    }
    next();
}