import mongoose, { mongo } from "mongoose";

const cartSchema = mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"products"
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const CartModel = mongoose.model("carts", cartschema);

export default CartModel;
