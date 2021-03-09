import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  indirizzo1: {
    type: String,
    required: true,
  },
  indirizzo2: String,
  city: {
    type: String,
    required: true,
  },
  paese: {
    type: String,
    required: true,
  },
  cap: {
    type: String,
    required: true,
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  ShippingAddressSchema
);

export default ShippingAddress;
