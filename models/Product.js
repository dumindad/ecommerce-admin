import mongoose, {model, Schema, models} from "mongoose";

// const ProductSchema = new Schema({
//   title: {type:String, required:true},
//   description: String,
//   price: {type: Number, required: true},
//   images: [{type:String}],
//   // category: {type:mongoose.Types.ObjectId, ref:'Category'},
//   category: {type: String},
//   properties: {type:Object},
// }, {
//   timestamps: true,
// });

// export const Product = models.Product || model('Product', ProductSchema);

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    // required: [true, "Please enter product description"],
  },
  shortDescription: {
    type: String,
  },
  DateSalePriceStarts: {
    type: String,
  },
  DateSalePriceEnd: {
    type: String,
  },
  weight: {
    type: String,
  },
  length: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  tags: {
    type: String,
  },
  price: {
    type: Number,
    // required: [true, "Please enter product price"],
  },
  salePrice: {
    type: Number,
    // required: [true, "Please enter product price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  category: {
    type: String,
    // required: [true, "Please enter product category"],
    // enum: {
    //   values: [
    //     // "Electronics",
    //     // "Cameras",
    //     // "Laptops",
    //     // "Accessories",
    //     // "Headphones",
    //     // "Sports",
    //   ],
    //   message: "Please select correct category",
    // },
  },
  seller: {
    type: String,
    // required: [true, "Please enter product seller"],
  },
  inStock: {
    type: Number,
    // required: [true, "Please enter product stock"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  allowCustomerRev: {
    type: Boolean,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
      rating: {
        type: Number,
        // required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.models.Product ||
//   mongoose.model("Product", productSchema);
export const Product = models.Product || model('Product', productSchema);
