import { prisma } from "../../../config/db/client.js"

export const createFiliereController = async (req, res) => {
    try {

        const {
            nom,
            description
        } = req.body

        if (!nom || !description) {
            return res.status(400).json({
                success: false,
                message: "Nom et description sont obligatoires"
            })
        }

        const filiereExist = await prisma.filieres.findFirst({
            where: {
                nom
            }
        })

        if (filiereExist) {
            return res.status(409).json({
                success: false,
                message: "Cette filière existe déjà"
            })
        }

        const filiere = await prisma.filieres.create({
            data: {
                nom,
                description
            }
        })

        return res.status(201).json({
            success: true,
            message: "Filière créée avec succès",
            data: filiere
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}