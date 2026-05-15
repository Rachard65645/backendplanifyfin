import { prisma } from "../../../config/db/client.js"

export const deleteEmploiController = async (req, res) => {
    try {

        const { id } = req.params

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

        await prisma.emploisDuTemps.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Planning supprimé"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}