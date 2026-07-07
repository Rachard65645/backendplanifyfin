import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { allowedHeaders, methods } from './src/utils/utils.js';
import authRouter from './src/routers/auth/authRouter.js';
import salleRouter from './src/routers/salles/salleRouter.js';
import enseignantRouter from './src/routers/enseignants/enseignantRouter.js';
import courRouter from './src/routers/cours/courRouter.js';
import emploiRouter from './src/routers/emploi/emploiRouter.js';
import filiereRouter from './src/routers/filiere/filiereRouter.js';
import SemestreRouter from './src/routers/semestres/semestreRoutes.js';


const app = express();



app.use(express.json());
app.use(morgan('dev'));


const corsOptions = {
    origin: process.env.CLIENT_URL || '*',
    methods: methods,
    allowedHeaders: allowedHeaders,
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', authRouter)
app.use('/api', salleRouter)
app.use('/api', enseignantRouter)
app.use('/api', courRouter)
app.use('/api', emploiRouter)
app.use('/api', filiereRouter)
app.use('/api', SemestreRouter)




app.use((err, req, res, next) => {
    console.error('Erreur globale : ', err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
});

app.use("/uploads", express.static("public/uploads"));


const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Serveur démarré sur http://${HOST}:${PORT}`);
});


