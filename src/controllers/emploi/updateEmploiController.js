import { prisma } from "../../../config/db/client.js"

export const updateEmploiController = async (req, res) => {
    try {

        const { id } = req.params

        const {
            dateCours,
            heureDebut,
            heureFin,
            statut
        } = req.body

        const emploi = await prisma.emploisDuTemps.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!emploi) {
            return res.status(404).json({
                success: false,
                message: "Planning introuvable"
            })
        }

        const updated = await prisma.emploisDuTemps.update({
            where: {
                id: Number(id)
            },

            data: {
                dateCours,
                heureDebut,
                heureFin,
                statut
            }
        })

        return res.status(200).json({
            success: true,
            message: "Planning modifié",
            data: updated
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}