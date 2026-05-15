-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(30) NOT NULL,
    `localisation` BOOLEAN NULL DEFAULT true,
    `codeVerification` VARCHAR(100) NULL,
    `roles` JSON NOT NULL,
    `typeCompte` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NULL,
    `immatriculation` VARCHAR(191) NULL,
    `expiredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Filieres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semestres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `anneeUniversitaire` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enseignants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `specialite` VARCHAR(191) NOT NULL,
    `disponibilite` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Enseignants_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `capacite` VARCHAR(191) NULL,
    `typeSalle` VARCHAR(191) NOT NULL,
    `equipements` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Salles_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `volumeHoraire` INTEGER NOT NULL,
    `typeCours` VARCHAR(191) NOT NULL,
    `enseignant_id` INTEGER NOT NULL,
    `filiere_id` INTEGER NOT NULL,
    `semestre_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmploisDuTemps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateCours` VARCHAR(191) NOT NULL,
    `heureDebut` VARCHAR(191) NOT NULL,
    `heureFin` VARCHAR(191) NOT NULL,
    `statut` VARCHAR(191) NOT NULL,
    `cours_id` INTEGER NOT NULL,
    `salle_id` INTEGER NOT NULL,
    `enseignant_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateReservation` VARCHAR(191) NOT NULL,
    `heureDebut` VARCHAR(191) NOT NULL,
    `heureFin` VARCHAR(191) NOT NULL,
    `useur_id` INTEGER NOT NULL,
    `salle_id` INTEGER NOT NULL,
    `cour_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DisponibilitesSalles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salle_id` INTEGER NOT NULL,
    `dateDispo` VARCHAR(191) NOT NULL,
    `heureDebut` VARCHAR(191) NOT NULL,
    `heureFin` VARCHAR(191) NOT NULL,
    `disponible` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rapport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_rapport` VARCHAR(191) NOT NULL,
    `fichier` VARCHAR(191) NOT NULL,
    `genere_par` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_enseignant_id_fkey` FOREIGN KEY (`enseignant_id`) REFERENCES `Enseignants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_filiere_id_fkey` FOREIGN KEY (`filiere_id`) REFERENCES `Filieres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_semestre_id_fkey` FOREIGN KEY (`semestre_id`) REFERENCES `Semestres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploisDuTemps` ADD CONSTRAINT `EmploisDuTemps_cours_id_fkey` FOREIGN KEY (`cours_id`) REFERENCES `Cours`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploisDuTemps` ADD CONSTRAINT `EmploisDuTemps_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `Salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploisDuTemps` ADD CONSTRAINT `EmploisDuTemps_enseignant_id_fkey` FOREIGN KEY (`enseignant_id`) REFERENCES `Enseignants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_useur_id_fkey` FOREIGN KEY (`useur_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `Salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservations` ADD CONSTRAINT `Reservations_cour_id_fkey` FOREIGN KEY (`cour_id`) REFERENCES `Cours`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DisponibilitesSalles` ADD CONSTRAINT `DisponibilitesSalles_salle_id_fkey` FOREIGN KEY (`salle_id`) REFERENCES `Salles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rapport` ADD CONSTRAINT `Rapport_genere_par_fkey` FOREIGN KEY (`genere_par`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
