import joi from 'joi'
import { password_regex } from '../../utils/utils.js';
import { codeHttp } from '../../../config/codeHttp/codeHttp.js';

export const registerRequest = (req, res, next) => {

    const register = joi.object({
        Name: joi.string().max(100).required().messages({
            'string.empty': 'Le nom est obligatoire',
            'string.max': 'Le nom ne doit pas dépasser 100 caractères',
        }),

        email: joi.string().email().max(191).required().messages({
            'string.email': 'Adresse email invalide',
            'string.empty': 'L’email est obligatoire',
        }),

        password: joi.string()
            .pattern(password_regex)
            .min(8)
            .required()
            .messages({
                'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
                'string.pattern.base': 'Mot de passe invalide',
                'string.empty': 'Le mot de passe est obligatoire',
            }),

        telephone: joi.string().min(9).max(30).required().messages({
            'string.min': 'Numéro de téléphone invalide',
            'string.max': 'Numéro de téléphone trop long',
            'string.empty': 'Le numéro de téléphone est obligatoire',
        }),

        typeCompte: joi.string().required().messages({
            'string.empty': 'Le typeCompte est obligatoire',
        }),

        immatriculation: joi.string().messages({
            'string.empty': 'Le typeCompte est obligatoire',
        }),
    });

    const { error } = register.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(codeHttp.BAD_REQUEST).json({
            error: error.details.map(d => d.message)
        });
    }

    next();
};
