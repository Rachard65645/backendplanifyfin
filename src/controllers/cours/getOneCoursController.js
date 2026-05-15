import { prisma } from "../../../config/db/client.js"

export const getOneCoursController = async (req, res) => {
    try {

        const { id } = req.params

        const cours = await prisma.cours.findUnique({
            where: {
                id: Number(id)
            },

            include: {
                enseignant: true,
                filiere: true,
                semestre: true,
                reservations: true
            }
        })

        if (!cours) {
            return res.status(404).json({
                success: false,
                message: "Cours introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: cours
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}