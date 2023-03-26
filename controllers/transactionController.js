import Transaction from '../models/TransactionModel.js';
import User from '../models/UserRegistration.js';

export const createTransaction = async (req, res) => {
    try {
      const { recipientId, amount } = req.body;
      const senderId = req.user.userId;
      console.log("🚀 ~ file: transactionController.js:8 ~ createTransaction ~ senderId:", senderId)
      
      // Check if sender has enough HourTokens
      const sender = await User.findById(senderId);
      if (sender.hourTokens < amount) {
        return res.status(400).json({ msg: 'Not enough HourTokens' });
      }
  
      // Subtract amount from sender's HourTokens and save
      sender.hourTokens -= amount;
      await sender.save();
  
      // Add amount to recipient's HourTokens and save
      const recipient = await User.findById(recipientId);
      recipient.hourTokens += amount;
      await recipient.save();
  
      // Create transaction record
      const transaction = new Transaction({
        sender: senderId,
        recipient: recipientId,
        amount
      });
      await transaction.save();
  
      res.json({ msg: 'Transaction successful', transaction });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
    export const getAllTransactions = async (req, res) => {
        try {
            const transactions = await Transaction.find().populate('sender recipient');
            res.json({ transactions });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        }
    }

    export const getTransactionsByUserId = async (req, res) => {
        try {
            const { id } = req.params;
            const transactions = await Transaction.find({ $or: [{ sender: id }, { recipient: id }] }).populate('sender recipient');
            res.json({ transactions });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        }
    }

    export const removeTransactionById = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Transaction.findByIdAndDelete(id);
            if (deleted) {
              return res.status(200).send("Transaction deleted", deleted);
            }
            throw new Error("Transaction not found");
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
  
    export const addHourTokens = async (req, res) => {
        const currentUser = req.user.userId
        const { amount } = req.body;
        try { 
          
            const recipient = await User.findById(currentUser);
            const newAmount = recipient.hourTokens += amount;
            await recipient.save();

            const transaction = new Transaction({
              sender: "641aee1d720ce9ce4b261188",
              recipient: currentUser,
              amount: newAmount
            });
            await transaction.save();

            res.json({ msg: `${amount} HourTokens added, your total amount is now ${newAmount} HourToken`, recipient,
           });
        }catch (error){
            console.error(error.message);
            res.status(500).json({ msg: 'Server error' });
        } 
    }