import express from "express"
import { createEmploiController } from "../../controllers/emploi/createEmploiController.js"
import { getAllEmploisController } from "../../controllers/emploi/getAllEmploisController.js"
import { getOneEmploiController } from "../../controllers/emploi/getOneEmploiController.js"
import { updateEmploiController } from "../../controllers/emploi/updateEmploiController.js"
import { deleteEmploiController } from "../../controllers/emploi/deleteEmploiController.js"



const emploiRouter = express.Router()

emploiRouter.post("/emploi/create", createEmploiController)

emploiRouter.get("/emploi/all", getAllEmploisController)

emploiRouter.get("/emploi/:id", getOneEmploiController)

emploiRouter.patch("/emploi/update/:id", updateEmploiController)

emploiRouter.delete("/emploi/delete/:id", deleteEmploiController)

export default emploiRouter