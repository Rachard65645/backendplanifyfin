import { prisma } from "../../../config/db/client.js"

export const updateFiliereController = async (req, res) => {
    try {

        const { id } = req.params

        const {
            nom,
            description
        } = req.body

        const filiereExist = await prisma.filieres.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!filiereExist) {
            return res.status(404).json({
                success: false,
                message: "Filière introuvable"
            })
        }

        const updatedFiliere = await prisma.filieres.update({
            where: {
                id: Number(id)
            },

            data: {
                nom,
                description
            }
        })

        return res.status(200).json({
            success: true,
            message: "Filière modifiée avec succès",
            data: updatedFiliere
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}