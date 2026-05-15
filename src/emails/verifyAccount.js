import 'dotenv/config'
import ejs from 'ejs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { promisify } from 'util'
import transporter from '../../config/email/mailer.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const renderFile = promisify(ejs.renderFile)

export const sendEmailverifyAccount = async (Name, email, verificationCode) => {
    try {
        const templatePath = __dirname + '/templates/verifyAccount.ejs'
        const htmlContent = await renderFile(templatePath, { Name, email, verificationCode })
        const mailOptions = {
            from: {
                name: process.env.MAIL_FROM_NAME,
                address: process.env.MAIL_USER,
            },
            to: email,
            subject: 'Vérification de votre compte',
            html: htmlContent,
        }
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}