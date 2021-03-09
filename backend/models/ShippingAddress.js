import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: String,
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

export default mongoose.model("ShippingAddress", ShippingAddressSchema);
