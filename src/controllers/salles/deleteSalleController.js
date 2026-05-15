import { prisma } from "../../../config/db/client.js"

export const deleteSalleController = async (req, res) => {
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

        await prisma.salles.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Salle supprimée avec succès"
        })

    } catch (error) {
        console.error("Erreur suppression salle:", error)

        let message = "Erreur serveur"

        if (error.code === 'P2003') {
            message = "Impossible de supprimer cette salle car elle est liée à d'autres données"
        }

        return res.status(500).json({
            success: false,
            message: message
        })
    }
}