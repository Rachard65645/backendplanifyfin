import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "465"), // directement 465
    secure: true, // Force secure pour SSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// logging pour le débogage
transporter.verify(function (error, success) {
    if (error) {
        console.log("Erreur SMTP:", error);
    } else {
        console.log("SMTP prêt à envoyer des emails");
    }
});

export default transporter;