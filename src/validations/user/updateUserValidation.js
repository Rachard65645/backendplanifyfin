import joi from 'joi'
import { codeHttp } from '../../../config/codeHttp/codeHttp.js';

export const updateUserRequest = (req, res, next) => {

    const schema = joi.object({
        Name: joi.string().max(100).messages({
            'string.max': 'Le Nom ne doit pas dépasser 100 caractères',
        }),

        email: joi.string().email().max(191).messages({
            'string.email': 'Adresse email invalide',
        }),

        telephone: joi.string().min(9).max(30).messages({
            'string.min': 'Numéro de téléphone invalide',
            'string.max': 'Numéro de téléphone trop long',
        }),
        telephone: joi.string().min(9).max(30).messages({
            'string.min': 'Numéro de téléphone invalide',
            'string.max': 'Numéro de téléphone trop long',
        }),


    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(codeHttp.BAD_REQUEST).json({
            error: error.details.map(d => d.message)
        });
    }

    next();
};
