import express from "express"
import { createSalleController } from "../../controllers/salles/CreateSalleController.js"
import { getAllSallesController } from "../../controllers/salles/getAllSallesController.js"
import { getOneSalleController } from "../../controllers/salles/getOneSalleController.js"
import { deleteSalleController } from "../../controllers/salles/deleteSalleController.js"
import { updateSalleController } from "../../controllers/salles/updateSalleController.js"


const salleRouter = express.Router()

salleRouter.post("/salles/create", createSalleController)

salleRouter.get("/salles/all", getAllSallesController)

salleRouter.get("/salles/:id", getOneSalleController)

salleRouter.param("/salles/update/:id", updateSalleController)

salleRouter.delete("/salles/delete/:id", deleteSalleController)

export default salleRouter