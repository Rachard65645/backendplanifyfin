import { prisma } from "../../../config/db/client.js"

export const getOneSalleController = async (req, res) => {
    try {

        const { id } = req.params

        const salle = await prisma.salles.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!salle) {
            return res.status(404).json({
                success: false,
                message: "Salle introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: salle
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}