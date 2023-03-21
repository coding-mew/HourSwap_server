import express from "express";
import { createTransaction,getAllTransactions, removeTransactionById,getTransactionsByUserId, addHourTokens } from "../controllers/transactionController.js";
import { validate, handleValidationErrors } from "../middlewares/userValidation.js";


const router = express.Router();

router.post("/createTransaction", validate, handleValidationErrors, createTransaction)
router.post('/addHourTokens', validate, handleValidationErrors, addHourTokens)
router.get('/getAllTransactions', validate, handleValidationErrors, getAllTransactions)
router.get('/getTransactionsByUserId/:id', validate, handleValidationErrors, getTransactionsByUserId)
router.delete('/removeTransactionById/:id', validate, handleValidationErrors, removeTransactionById)


export default router;