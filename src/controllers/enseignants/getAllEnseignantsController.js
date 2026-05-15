import { prisma } from "../../../config/db/client.js"

export const getAllEnseignantsController = async (req, res) => {
    try {

        const enseignants = await prisma.enseignants.findMany({
            orderBy: {
                id: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            count: enseignants.length,
            data: enseignants
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}