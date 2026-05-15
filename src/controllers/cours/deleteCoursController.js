import { prisma } from "../../../config/db/client.js"

export const deleteCoursController = async (req, res) => {
    try {

        const { id } = req.params

        const cours = await prisma.cours.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!cours) {
            return res.status(404).json({
                success: false,
                message: "Cours introuvable"
            })
        }

        await prisma.cours.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Cours supprimé avec succès"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}