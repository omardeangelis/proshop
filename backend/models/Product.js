import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "../dafault-prod-imgage.jpg",
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "Sono ammessi 500 caratteri al massimo"],
    },
    price: {
      type: Number,
      required: true,
      min: [1, "non possono essere venduti prodotti gratuiti"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "non è possibile avere stock negativo"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
  next();
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
