import { prisma } from "../../../config/db/client.js"

export const getAllEmploisController = async (req, res) => {
    try {

        const emplois = await prisma.emploisDuTemps.findMany({

            include: {
                cours: true,
                salle: true,
                enseignant: true
            },

            orderBy: {
                id: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            total: emplois.length,
            data: emplois
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}