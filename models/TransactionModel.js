import mongoose from 'mongoose';


const TransactionSchema = new mongoose.Schema({
  
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hourTokens: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});


const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
