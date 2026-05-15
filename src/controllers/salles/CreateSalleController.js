import { prisma } from "../../../config/db/client.js"

export const createSalleController = async (req, res) => {
    try {
        const {
            code,
            nom,
            capacite,
            typeSalle,
            equipements,
            status
        } = req.body

        if (!code || !typeSalle) {
            return res.status(400).json({
                success: false,
                message: "Le code et le type de salle sont obligatoires"
            })
        }

        const salleExist = await prisma.salles.findUnique({
            where: {
                code: code
            }
        })

        if (salleExist) {
            return res.status(409).json({
                success: false,
                message: "Cette salle existe déjà"
            })
        }

        const newSalle = await prisma.salles.create({
            data: {
                code,
                nom: nom || null,
                capacite: capacite || null,  // String, pas besoin de Number()
                typeSalle,
                equipements: equipements || null,
                status: status || 'libre'  // Changé à status
            }
        })

        return res.status(201).json({
            success: true,
            message: "Salle créée avec succès",
            data: newSalle
        })

    } catch (error) {
        console.error("Erreur création salle:", error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}