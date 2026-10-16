import express from "express";
import ProductModel from "../models/product.model.js";
import razorpayInstance from "../config/razorpay.config.js";
import PaymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/env.config.js";

const router = express.Router();

/**
 * @method POST
 * @route /api/payments/:productId/order
 * @description Create an order for the specified product with razorpay
 */
router.post("/:productId/order", async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const order = await razorpayInstance.orders.create({
    amount: product.price.amount * 100,
    currency: product.price.currency,
    receipt: `order_rcptid_${productId}`,
    notes: {
      productId: productId,
      productTitle: product.title,
    },
  });

  const payment = (
    await PaymentModel.create({
      orderId: order.id,
      productId: productId,
      amount: product.price.amount,
      currency: product.price.currency,
      status: "pending",
    })
  ).toObject();

  return res.status(201).json({ ...payment, keyId: razorpayInstance.key_id });
});

/**
 * @method POST
 * @route /api/payments/verify
 * @description Verify the payment for the specified product with razorpay
 */
router.post("/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const payment = await PaymentModel.findOne({
    orderId: orderId,
    status: "pending",
  });

  if (!payment) {
    return res
      .status(404)
      .json({ message: "Payment not found or already verified" });
  }

  const isValid = validatePaymentVerification(
    {
      order_id: orderId,
      payment_id: paymentId,
    },
    signature,
    config.RAZORPAY_KEY_SECRET,
  );

  if (!isValid) {
    return res.status(400).json({ message: "Invalid payment verification" });
  }

  await PaymentModel.updateOne(
    { orderId: orderId },
    {
      $set: { status: "completed", paymentId: paymentId, signature: signature },
    },
  );

  /**
   * Update the payment status to "completed" and store the paymentId and signature.
   * write extra logic here if needed, such as notifying the user or updating related records.
   */

  return res.status(200).json({ message: "Payment verified successfully" });
});

export default router;
