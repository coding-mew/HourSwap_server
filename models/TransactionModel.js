import mongoose from 'mongoose';


const TransactionSchema = new mongoose.Schema({
  
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, min: 0, max: 10 },
  timestamp: { type: Date, default: Date.now },
});


const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
