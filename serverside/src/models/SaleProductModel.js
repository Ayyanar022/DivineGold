import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
    jewellName: String,
    jewellCategory: String,
    jewllTouch: String,
    netWeight: Number,
    PrizeToken: Number,
    quantity: Number,
    price: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User model
  });

const SaleItem = mongoose.model('saleItemSchema',saleItemSchema)
export default SaleItem;