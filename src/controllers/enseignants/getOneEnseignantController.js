import { prisma } from "../../../config/db/client.js"

export const getOneEnseignantController = async (req, res) => {
    try {

        const { id } = req.params

        const enseignant = await prisma.enseignants.findUnique({
            where: {
                id: Number(id)
            },

            include: {
                cours: true,
            }
        })

        if (!enseignant) {
            return res.status(404).json({
                success: false,
                message: "Enseignant introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: enseignant
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}