import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    // product: { type: mongoose.Schema.ObjectId, ref: "product", required: true },
    // user: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    status: {
      tyep: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const PaymentModel = mongoose.model("payment", paymentSchema);

export default PaymentModel;
