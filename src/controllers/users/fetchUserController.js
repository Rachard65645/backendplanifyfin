import { codeHttp } from "../../../config/codeHttp/codeHttp.js";
import { prisma } from "../../../config/db/client.js";

export const fetchUserController = async (req, res) => {
    try {
        // 1. Récupération des paramètres de pagination
        const page = parseInt(req.query.page) || 1;      // page actuelle
        const limit = parseInt(req.query.limit) || 10;   // nombre d’éléments par page
        const skip = (page - 1) * limit;

        // 2. Compter le nombre total d’utilisateurs
        const totalItems = await prisma.users.count();

        // 3. Récupérer les utilisateurs paginés
        const users = await prisma.users.findMany({
            skip: skip,
            take: limit,
            select: {
                id: true,
                Name: true,
                email: true,
                telephone: true,
            }
        });

        // 4. Calcul du nombre total de pages
        const totalPages = Math.ceil(totalItems / limit);

        // 5. Réponse propre
        return res.status(codeHttp.SUCCESS).json({
            users: users,
            pagination: {
                page: page,
                limit: limit,
                totalItems: totalItems,
                totalPages: totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });

    } catch (err) {
        return res.status(codeHttp.SERVER_ERROR).json({
            message: "Erreur lors de la récupération des utilisateurs"
        });
    }
};
