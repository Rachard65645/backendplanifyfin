import { prisma } from "../../../config/db/client.js"

export const createSemestreController = async (req, res) => {
    try {
        const { numero, anneeUniversitaire } = req.body

        if (!numero || !anneeUniversitaire) {
            return res.status(400).json({
                success: false,
                message: "Le numéro et l'année universitaire sont obligatoires"
            })
        }

        const semestreExist = await prisma.semestres.findFirst({
            where: {
                numero: Number(numero),
                anneeUniversitaire: anneeUniversitaire.trim()
            }
        })

        if (semestreExist) {
            return res.status(409).json({
                success: false,
                message: `Le semestre ${numero} de l'année ${anneeUniversitaire} existe déjà`
            })
        }

        const semestre = await prisma.semestres.create({
            data: {
                numero: Number(numero),
                anneeUniversitaire: anneeUniversitaire.trim()
            }
        })

        return res.status(201).json({
            success: true,
            message: "Semestre créé avec succès",
            data: semestre
        })

    } catch (error) {
        console.error("Erreur création semestre:", error)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la création du semestre"
        })
    }
}


export const getAllSemestresController = async (req, res) => {
    try {
        const semestres = await prisma.semestres.findMany({
            include: {
                cours: {
                    select: {
                        id: true,
                        nom: true,
                        code: true,
                        typeCours: true
                    }
                },
                _count: {
                    select: {
                        cours: true
                    }
                }
            },
            orderBy: [
                { anneeUniversitaire: 'asc' },
                { numero: 'asc' }
            ]
        })

        return res.status(200).json({
            success: true,
            count: semestres.length,
            data: semestres
        })

    } catch (error) {
        console.error("Erreur récupération semestres:", error)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la récupération des semestres"
        })
    }
}


export const getOneSemestreController = async (req, res) => {
    try {
        const { id } = req.params

        const semestre = await prisma.semestres.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                cours: {
                    include: {
                        enseignant: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                email: true
                            }
                        },
                        filiere: {
                            select: {
                                id: true,
                                nom: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        cours: true
                    }
                }
            }
        })

        if (!semestre) {
            return res.status(404).json({
                success: false,
                message: "Semestre introuvable"
            })
        }

        return res.status(200).json({
            success: true,
            data: semestre
        })

    } catch (error) {
        console.error("Erreur récupération semestre:", error)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la récupération du semestre"
        })
    }
}

export const updateSemestreController = async (req, res) => {
    try {
        const { id } = req.params
        const { numero, anneeUniversitaire } = req.body

        if (!numero || !anneeUniversitaire) {
            return res.status(400).json({
                success: false,
                message: "Le numéro et l'année universitaire sont obligatoires"
            })
        }

        const semestreExist = await prisma.semestres.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!semestreExist) {
            return res.status(404).json({
                success: false,
                message: "Semestre introuvable"
            })
        }

        const doublonExist = await prisma.semestres.findFirst({
            where: {
                numero: Number(numero),
                anneeUniversitaire: anneeUniversitaire.trim(),
                id: {
                    not: Number(id)
                }
            }
        })

        if (doublonExist) {
            return res.status(409).json({
                success: false,
                message: `Le semestre ${numero} de l'année ${anneeUniversitaire} existe déjà`
            })
        }

        const updatedSemestre = await prisma.semestres.update({
            where: {
                id: Number(id)
            },
            data: {
                numero: Number(numero),
                anneeUniversitaire: anneeUniversitaire.trim()
            }
        })

        return res.status(200).json({
            success: true,
            message: "Semestre modifié avec succès",
            data: updatedSemestre
        })

    } catch (error) {
        console.error("Erreur modification semestre:", error)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la modification du semestre"
        })
    }
}

export const deleteSemestreController = async (req, res) => {
    try {
        const { id } = req.params

        const semestre = await prisma.semestres.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                _count: {
                    select: {
                        cours: true
                    }
                }
            }
        })

        if (!semestre) {
            return res.status(404).json({
                success: false,
                message: "Semestre introuvable"
            })
        }

        if (semestre._count.cours > 0) {
            return res.status(400).json({
                success: false,
                message: `Impossible de supprimer le semestre ${semestre.numero} car il contient ${semestre._count.cours} cours. Veuillez d'abord supprimer ou déplacer ces cours.`
            })
        }

        await prisma.semestres.delete({
            where: {
                id: Number(id)
            }
        })

        return res.status(200).json({
            success: true,
            message: "Semestre supprimé avec succès"
        })

    } catch (error) {
        console.error("Erreur suppression semestre:", error)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur lors de la suppression du semestre"
        })
    }
}