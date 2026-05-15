import { prisma } from "../../../config/db/client.js"

export const updateCoursController = async (req, res) => {
    try {

        const { id } = req.params

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

        const coursExist = await prisma.cours.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!coursExist) {
            return res.status(404).json({
                success: false,
                message: "Cours introuvable"
            })
        }

        const updatedCours = await prisma.cours.update({
            where: {
                id: Number(id)
            },

            data: {
                nom,
                code,
                description,

                volumeHoraire: volumeHoraire
                    ? Number(volumeHoraire)
                    : undefined,

                typeCours,

                enseignant_id: enseignant_id
                    ? Number(enseignant_id)
                    : undefined,

                filiere_id: filiere_id
                    ? Number(filiere_id)
                    : undefined,

                semestre_id: semestre_id
                    ? Number(semestre_id)
                    : undefined
            },

            include: {
                enseignant: true,
                filiere: true,
                semestre: true
            }
        })

        return res.status(200).json({
            success: true,
            message: "Cours modifié avec succès",
            data: updatedCours
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            success: false,
            message: "Erreur serveur"
        })
    }
}