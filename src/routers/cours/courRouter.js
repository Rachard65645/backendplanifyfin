import express from "express"
import { createCoursController } from "../../controllers/cours/createCoursController.js"
import { getAllCoursController } from "../../controllers/cours/getAllCoursController.js"
import { getOneCoursController } from "../../controllers/cours/getOneCoursController.js"
import { updateCoursController } from "../../controllers/cours/updateCoursController.js"
import { deleteCoursController } from "../../controllers/cours/deleteCoursController.js"


const courRouter = express.Router()

courRouter.post("/cours/create", createCoursController)

courRouter.get("/cours/all", getAllCoursController)

courRouter.get("/cours/:id", getOneCoursController)

courRouter.put("/cours/update/:id", updateCoursController)

courRouter.delete("/cours/delete/:id", deleteCoursController)

export default courRouter