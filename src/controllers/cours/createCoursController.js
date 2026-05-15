import { prisma } from "../../../config/db/client.js"

export const createCoursController = async (req, res) => {
    try {

        const {
            nom,
            code,
            description,
            volumeHoraire,
            typeCours,
            enseignant_id,
            filiere_id,
            semestre_id
        } = req.body

        if (
            !nom ||
            !description ||
            !volumeHoraire ||
            !typeCours ||
            !enseignant_id ||
            !filiere_id ||
            !semestre_id
        ) {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont obligatoires"
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

        const filiere = await prisma.filieres.findUnique({
            where: {
                id: Number(filiere_id)
            }
        })

        if (!filiere) {
            return res.status(404).json({
                success: false,
                message: "Filière introuvable"
            })
        }

        const semestre = await prisma.semestres.findUnique({
            where: {
                id: Number(semestre_id)
            }
        })

        if (!semestre) {
            return res.status(404).json({
                success: false,
                message: "Semestre introuvable"
            })
        }

        const cours = await prisma.cours.create({
            data: {
                nom,
                code,
                description,
                volumeHoraire: Number(volumeHoraire),
                typeCours,
                enseignant_id: Number(enseignant_id),
                filiere_id: Number(filiere_id),
                semestre_id: Number(semestre_id)
            },

            include: {
                enseignant: true,
                filiere: true,
                semestre: true
            }
        })

        return res.status(201).json({
            success: true,
            message: "Cours créé avec succès",
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