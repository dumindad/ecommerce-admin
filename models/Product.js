import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: {type:String},
  price: {type: Number, required: true},
  images: [{
    url:{type:String},
    public_id: {type:String}
  }],
  category: {type:String},
  // category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);