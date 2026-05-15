import { prisma } from "../../../config/db/client.js"

export const updateSalleController = async (req, res) => {
    try {
        const { id } = req.params

        const {
            code,
            nom,
            capacite,
            typeSalle,
            equipements,
            status
        } = req.body





        // Construire l'objet data avec seulement les champs fournis et non vides
        const updateData = {}

        if (code !== undefined && code !== '') {
            updateData.code = code
        }
        if (nom !== undefined) {
            updateData.nom = nom || null  // Chaîne vide devient null
        }
        if (capacite !== undefined) {
            updateData.capacite = capacite || null  // Chaîne vide devient null
        }
        if (typeSalle !== undefined && typeSalle !== '') {
            updateData.typeSalle = typeSalle
        }
        if (equipements !== undefined) {
            updateData.equipements = equipements || null  // Chaîne vide devient null
        }
        if (status !== undefined && status !== '') {
            updateData.status = status
        }

        // Vérifier qu'il y a au moins un champ à mettre à jour
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Aucune donnée à mettre à jour"
            })
        }

        // Mettre à jour la salle
        const updatedSalle = await prisma.salles.update({
            where: {
                id: Number(id)
            },
            data: updateData
        })

        return res.status(200).json({
            success: true,
            message: "Salle modifiée avec succès",
            data: updatedSalle
        })

    } catch (error) {
        console.error("Erreur modification salle:", error)

        // Gestion des erreurs Prisma
        if (error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: "Ce code est déjà utilisé par une autre salle"
            })
        }

        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Salle introuvable"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}