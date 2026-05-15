import express from "express";
import { getCurrentUser } from "../../controllers/users/currentUserController.js";
import { updateUser } from "../../controllers/users/updateUserController.js";
import { isGrantedAccess } from "../../middlewares/auth/middlewaresAuth.js";
import { role } from "../../utils/utils.js";
import { updateUserRequest } from "../../validations/user/updateUserValidation.js";
import { deleteUserController } from "../../controllers/users/deleteUserController.js";
import { findUserController } from "../../controllers/users/findUserController.js";
import { fetchUserController } from "../../controllers/users/fetchUserController.js";

const userRouter = express.Router();

userRouter.get('/me', isGrantedAccess([role.ADMIN, role.USER, role.Entreprise]), getCurrentUser)
userRouter.patch('/users/update', updateUserRequest, isGrantedAccess([role.USER]), updateUser)
userRouter.delete('/users/delete/:id', isGrantedAccess([role.ADMIN]), deleteUserController)
userRouter.get('/users/:id', isGrantedAccess([role.ADMIN]), findUserController)
userRouter.get('/users', isGrantedAccess([role.ADMIN]), fetchUserController)


export default userRouter;