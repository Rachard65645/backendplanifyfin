import { prisma } from "../../../config/db/client.js"

export const deleteEnseignantController = async (req, res) => {
    try {

        const { id } = req.params

        const enseignant = await prisma.enseignants.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!enseignant) {
            return res.status(404).json({
                success: false,
                message: "Enseignant introuvable"
            })
        }

        await prisma.enseignants.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Enseignant supprimé avec succès"
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}