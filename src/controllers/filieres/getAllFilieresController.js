import { prisma } from "../../../config/db/client.js"

export const getAllFilieresController = async (req, res) => {
    try {

        const filieres = await prisma.filieres.findMany({

            include: {
                cours: true
            },

            orderBy: {
                id: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            total: filieres.length,
            data: filieres
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}