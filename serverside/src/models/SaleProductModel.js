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
  },
  { timestamps:true } // This adds createdAt and updatedAt fields automatically
  );

const SaleItem = mongoose.model('saleItemSchema',saleItemSchema)
export default SaleItem;