import { prisma } from "../../../config/db/client.js"

export const getOneEmploiController = async (req, res) => {
    try {

        const { id } = req.params

        const emploi = await prisma.emploisDuTemps.findUnique({
            where: {
                id: Number(id)
            },

            include: {
                cours: true,
                salle: true,
                enseignant: true
            }
        })

        if (!emploi) {
            return res.status(404).json({
                success: false,
                message: "Planning introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: emploi
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}