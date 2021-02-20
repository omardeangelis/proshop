import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [75, "Massimo 75 Caratteri"],
    },
    description: {
      type: String,
      maxlength: [500, "massimo 500 caratteri"],
    },
    rating: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
