import express from "express";
import { createTask, getTasksForUser, getAllOffers, getAllRequests, getAllExchanges, getAllTasks, updateTaskById, deleteTaskById } from "../controllers/taskController.js";
import { validate } from "../middlewares/userValidation.js";


const router = express.Router();

router.post("/createTask", validate, createTask)
router.get('/getTasksForUser/:userId',validate, getTasksForUser);
router.get('/getAllTasks', validate, getAllTasks);
router.get('/getAllOffers', validate, getAllOffers);
router.get('/getAllRequests', validate, getAllRequests);
router.get('/getAllExchanges', validate, getAllExchanges);
router.put('/updateTask/:id', validate, updateTaskById);
router.delete('/deleteTask/:id', validate, deleteTaskById)



export default router