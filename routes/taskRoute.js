import express from "express";
import { createTask, getTasksForUser, getAllOffers, getAllRequests, getAllExchanges, getAllTasks, updateTaskById, deleteTaskById } from "../controllers/taskController.js";
import { validate, handleValidationErrors } from "../middlewares/userValidation.js";


const router = express.Router();

router.post("/createTask", validate, handleValidationErrors, createTask)
router.get('/getTasksForUser/:userId',validate, handleValidationErrors, getTasksForUser);
router.get('/getAllTasks', validate, handleValidationErrors, getAllTasks);
router.get('/getAllOffers', validate, handleValidationErrors, getAllOffers);
router.get('/getAllRequests', validate, handleValidationErrors, getAllRequests);
router.get('/getAllExchanges', validate, handleValidationErrors, getAllExchanges);
router.put('/updateTask/:id', validate, handleValidationErrors, updateTaskById);
router.delete('/deleteTask/:id', validate, handleValidationErrors, deleteTaskById)



export default router