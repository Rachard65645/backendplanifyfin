import { prisma } from "../../../config/db/client.js"

export const createEnseignantController = async (req, res) => {
    try {

        const {
            nom,
            prenom,
            email,
            telephone,
            specialite,
            disponibilite
        } = req.body

        if (!nom || !prenom || !email) {
            return res.status(400).json({
                success: false,
                message: "Nom, prénom et email sont obligatoires"
            })
        }

        const enseignantExist = await prisma.enseignants.findUnique({
            where: {
                email
            }
        })

        if (enseignantExist) {
            return res.status(409).json({
                success: false,
                message: "Cet enseignant existe déjà"
            })
        }

        const enseignant = await prisma.enseignants.create({
            data: {
                nom,
                prenom,
                email,
                telephone,
                specialite,
                disponibilite
            }
        })

        return res.status(201).json({
            success: true,
            message: "Enseignant créé avec succès",
            data: enseignant
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}