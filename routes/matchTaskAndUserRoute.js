import express from "express";
import { validate, handleValidationErrors } from "../middlewares/userValidation";
import { applyForTask,getTaskApplicationsByUserId, withdrawTaskApplication } from "../controllers/matchTaskAndUserController";

const router = express.Router();

router.post('/applyfortask', validate, handleValidationErrors, applyForTask)
router.get('/getTaskAppicationByUserId/:id', validate, handleValidationErrors, getTaskApplicationsByUserId)
router.delete('/withdrawTaskApplication/:id', validate, handleValidationErrors, withdrawTaskApplication)