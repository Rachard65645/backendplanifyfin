import { createSemestreController, deleteSemestreController, getAllSemestresController, getOneSemestreController, updateSemestreController } from "../../controllers/semestres/semestreController.js";
import express from "express";

const SemestreRouter = express.Router();

SemestreRouter.post("/semestre/create", createSemestreController);

SemestreRouter.get("/semestre/all", getAllSemestresController);

SemestreRouter.get("/semestre/:id", getOneSemestreController);

SemestreRouter.patch("/semestre/update/:id", updateSemestreController);

SemestreRouter.delete("/semestre/delete/:id", deleteSemestreController);

export default SemestreRouter;