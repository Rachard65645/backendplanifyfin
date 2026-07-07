import { prisma } from "../../../config/db/client.js"

export const getAllCoursController = async (req, res) => {
    try {

        const cours = await prisma.cours.findMany({

            include: {
                enseignant: true,
                filiere: true,
                semestre: true,
               
            },

            orderBy: {
                id: "desc"
            }
        })

        return res.status(200).json({
            success: true,
            total: cours.length,
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