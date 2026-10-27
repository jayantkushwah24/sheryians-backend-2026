const mongoose = require("mongoose");

// GeoJSON point. Coordinates are [longitude, latitude] (longitude first!).
const pointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (value) => value.length === 2,
        message: "coordinates must be [lng, lat]",
      },
    },
  },
  { _id: false },
);

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    city: { type: String, required: true, trim: true },
    area: { type: String, trim: true },
    cuisines: { type: [String], default: [] },
    location: { type: pointSchema, required: true },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

restaurantSchema.index({ name: 1, _id: 1 });
restaurantSchema.index({ city: 1, name: 1, _id: 1 });

module.exports = mongoose.model("Restaurant", restaurantSchema);
