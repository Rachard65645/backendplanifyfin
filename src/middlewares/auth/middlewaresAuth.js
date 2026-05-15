import jwt from 'jsonwebtoken'
import { codeHttp } from '../../../config/codeHttp/codeHttp.js'
import { authErrorMessages } from '../../../config/messages/error/authErrorMessage/authErrorMessage.js'
import { getRequest } from '../../utils/utils.js'

function getRequestToken(req, res) {
    const authHeader = req.headers[getRequest.AUTHORIZATION]
    if (!authHeader || typeof authHeader !== getRequest.STRING) {
        return res.status(codeHttp.UNAUTHORIZED).send(authErrorMessages.INVALID_TOKEN)
    }
    const [bearer, token, ...others] = authHeader.split(' ')
    if (others.length !== 0 || bearer.toLowerCase() !== getRequest.BEARER) {
        return res.status(codeHttp.UNAUTHORIZED).send(authErrorMessages.INVALID_TOKEN)
    }
    return token
}

export function isGrantedAccess(role) {
    return (req, res, next) => {
        const token = getRequestToken(req, res)
        if (!token) return res.status(codeHttp.UNAUTHORIZED).send(authErrorMessages.INVALID_TOKEN)

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            return res.status(codeHttp.BAD_REQUEST).send(authErrorMessages.INVALID_TOKEN)
        }

        if (!req.user) {
            return res.status(codeHttp.UNAUTHORIZED).send(authErrorMessages.USER_NOT_FOUND)
        }

        const userRoles = req.user.roles
        if (!userRoles) {
            return res.status(codeHttp.UNAUTHORIZED).send(authErrorMessages.USER_ROLES_NOT_FOUND)
        }

        const granted = role.some((role) => userRoles.includes(role))
        if (!granted) {
            return res.status(codeHttp.FORBIDDEN).send(authErrorMessages.FORBIDDEN_ACCESS)
        }
        
        next()
    }
}