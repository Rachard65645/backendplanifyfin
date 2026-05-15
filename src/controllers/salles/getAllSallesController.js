import { prisma } from "../../../config/db/client.js"

export const getAllSallesController = async (req, res) => {
    try {

        const salles = await prisma.salles.findMany({
            orderBy: {
                id: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            count: salles.length,
            data: salles
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}