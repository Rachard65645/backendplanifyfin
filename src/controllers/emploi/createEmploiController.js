import { prisma } from "../../../config/db/client.js"

export const createEmploiController = async (req, res) => {
    try {

        const {
            dateCours,
            heureDebut,
            heureFin,
            statut,
            cours_id,
            salle_id,
            enseignant_id
        } = req.body

        if (
            !dateCours ||
            !heureDebut ||
            !heureFin ||
            !cours_id ||
            !salle_id ||
            !enseignant_id
        ) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont obligatoires"
            })
        }

        const salle = await prisma.salles.findUnique({
            where: {
                id: Number(salle_id)
            }
        })

        if (!salle) {
            return res.status(404).json({
                success: false,
                message: "Salle introuvable"
            })
        }

        const enseignant = await prisma.enseignants.findUnique({
            where: {
                id: Number(enseignant_id)
            }
        })

        if (!enseignant) {
            return res.status(404).json({
                success: false,
                message: "Enseignant introuvable"
            })
        }

        const cours = await prisma.cours.findUnique({
            where: {
                id: Number(cours_id)
            }
        })

        if (!cours) {
            return res.status(404).json({
                success: false,
                message: "Cours introuvable"
            })
        }

        const conflitSalle = await prisma.emploisDuTemps.findFirst({
            where: {
                salle_id: Number(salle_id),
                dateCours,
                heureDebut
            }
        })

        if (conflitSalle) {
            return res.status(409).json({
                success: false,
                message: "Salle déjà occupée"
            })
        }

        const conflitEnseignant = await prisma.emploisDuTemps.findFirst({
            where: {
                enseignant_id: Number(enseignant_id),
                dateCours,
                heureDebut
            }
        })

        if (conflitEnseignant) {
            return res.status(409).json({
                success: false,
                message: "Enseignant déjà occupé"
            })
        }

        const emploi = await prisma.emploisDuTemps.create({
            data: {
                dateCours,
                heureDebut,
                heureFin,
                statut,

                cours_id: Number(cours_id),
                salle_id: Number(salle_id),
                enseignant_id: Number(enseignant_id)
            },

            include: {
                cours: true,
                salle: true,
                enseignant: true
            }
        })

        return res.status(201).json({
            success: true,
            message: "Planning créé avec succès",
            data: emploi
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}