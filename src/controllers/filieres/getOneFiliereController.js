import { prisma } from "../../../config/db/client.js"

export const getOneFiliereController = async (req, res) => {
    try {

        const { id } = req.params

        const filiere = await prisma.filieres.findUnique({
            where: {
                id: Number(id)
            },

            include: {
                cours: {
                    include: {
                        enseignant: true,
                        semestre: true
                    }
                }
            }
        })

        if (!filiere) {
            return res.status(404).json({
                success: false,
                message: "Filière introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: filiere
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}