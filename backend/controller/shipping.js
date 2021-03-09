import ShippingAddress from "../models/ShippingAddress.js";
import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
//@desc     Get user shipping information
//@Route    GET /api/shipping
//@Access   Privato
export const getUserShippingAddress = asyncErrorHandler(
  async (req, res, next) => {
    const shipping = await ShippingAddress.findOne({
      user: req.user.id,
    }).select("-user");

    if (!shipping) {
      return res.status(404).json({
        success: false,
        data: {
          indirizzo1: "",
          indirizzo2: "",
          city: "",
          paese: "",
          cap: "",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: shipping,
    });
  }
);

//@desc     Get user shipping information
//@Route    POST /api/shipping
//@Access   Privato
export const createUserShippingAddress = asyncErrorHandler(
  async (req, res, next) => {
    let shipping = await ShippingAddress.findOne({ user: req.user.id });

    if (shipping) {
      return next(
        new ErrorResponse(
          `utente ha già un indirizzo di spedizione ${shipping}`,
          400
        )
      );
    }

    shipping = await ShippingAddress.create({
      user: req.user.id,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      data: shipping,
    });
  }
);

//@desc     Update User Shipping Information
//@Route    PUT /api/shipping
//@Access   Privato
export const updateUserShippingAddress = asyncErrorHandler(
  async (req, res, next) => {
    let shipping = await ShippingAddress.find({ user: req.user.id });

    if (!shipping) {
      return next(
        new ErrorResponse(
          `Utente non ha ancora un indirizzo di spedizione`,
          400
        )
      );
    }

    const fieldToUpdate = { ...req.body };
    for (const [key, value] of Object.values(fieldToUpdate)) {
      if (!value) {
        delete fieldToUpdate[key];
      }
    }

    shipping = await ShippingAddress.findOneAndUpdate(
      { user: req.user.id },
      { $set: { ...fieldToUpdate } },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      data: shipping,
    });
  }
);

//@desc     Get user shipping information
//@Route    DELETE /api/shipping
//@Access   Privato
export const deleteUserShippingAddress = asyncErrorHandler(
  async (req, res, next) => {
    const shipping = await ShippingAddress.find({ user: req.user.id });

    if (!shipping) {
      return next(
        new ErrorResponse("Utente non ha indirizzo da eliminare", 404)
      );
    }

    await ShippingAddress.findOneAndDelete({ user: req.user.id });

    return res.status(200).json({
      success: true,
      data: {},
    });
  }
);
