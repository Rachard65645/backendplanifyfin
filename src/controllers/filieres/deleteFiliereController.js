import { prisma } from "../../../config/db/client.js"

export const deleteFiliereController = async (req, res) => {
    try {

        const { id } = req.params

        const filiere = await prisma.filieres.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!filiere) {
            return res.status(404).json({
                success: false,
                message: "Filière introuvable"
            })
        }

        await prisma.filieres.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Filière supprimée avec succès"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}