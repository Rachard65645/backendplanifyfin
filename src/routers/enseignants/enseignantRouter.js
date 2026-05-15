import express from "express"
import { createEnseignantController } from "../../controllers/enseignants/createEnseignantController.js"
import { getAllEnseignantsController } from "../../controllers/enseignants/getAllEnseignantsController.js"
import { getOneEnseignantController } from "../../controllers/enseignants/getOneEnseignantController.js"
import { updateEnseignantController } from "../../controllers/enseignants/updateEnseignantController.js"
import { deleteEnseignantController } from "../../controllers/enseignants/deleteEnseignantController.js"



const enseignantRouter = express.Router()

enseignantRouter.post("/enseignants/create", createEnseignantController)

enseignantRouter.get("/enseignants/all", getAllEnseignantsController)

enseignantRouter.get("/enseignants/:id", getOneEnseignantController)

enseignantRouter.put("/enseignants/update/:id", updateEnseignantController)

enseignantRouter.delete("/enseignants/delete/:id", deleteEnseignantController)

export default enseignantRouter