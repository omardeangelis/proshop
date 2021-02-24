import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "inserisci un nome"],
    },
    email: {
      type: String,
      required: [true, "inserisci una mail"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Inserisci una mail valida",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "inserisci una password"],
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.methods.hashPassword = async function (enteredPasswrod) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(enteredPasswrod, salt);
};

UserSchema.pre("save", async function (next) {
  //Se la password non viene modificata vado avanti
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log(error);
  }
});

//Model Method per verificare se la password inserita è corretta
UserSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Crea un token nuovo
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
