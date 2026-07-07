import express from "express"
import { createFiliereController } from "../../controllers/filieres/createFiliereController.js"
import { getAllFilieresController } from "../../controllers/filieres/getAllFilieresController.js"
import { getOneFiliereController } from "../../controllers/filieres/getOneFiliereController.js"
import { updateFiliereController } from "../../controllers/filieres/updateFiliereController.js"
import { deleteFiliereController } from "../../controllers/filieres/deleteFiliereController.js"


const filiereRouter = express.Router()

filiereRouter.post("/filiere/create", createFiliereController)

filiereRouter.get("/filiere/all", getAllFilieresController)

filiereRouter.get("/filiere/:id", getOneFiliereController)

filiereRouter.patch("/filiere/update/:id", updateFiliereController)

filiereRouter.delete("/filiere/delete/:id", deleteFiliereController)

export default filiereRouter