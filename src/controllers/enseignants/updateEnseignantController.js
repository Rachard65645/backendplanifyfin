import { prisma } from "../../../config/db/client.js"

export const updateEnseignantController = async (req, res) => {
    try {

        const { id } = req.params

        const {
            nom,
            prenom,
            email,
            telephone,
            specialite,
            disponibilite
        } = req.body

        const enseignantExist = await prisma.enseignants.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!enseignantExist) {
            return res.status(404).json({
                success: false,
                message: "Enseignant introuvable"
            })
        }

        const updatedEnseignant = await prisma.enseignants.update({
            where: {
                id: Number(id)
            },

            data: {
                nom,
                prenom,
                email,
                telephone,
                specialite,
                disponibilite
            }
        })

        return res.status(200).json({
            success: true,
            message: "Enseignant modifié avec succès",
            data: updatedEnseignant
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}