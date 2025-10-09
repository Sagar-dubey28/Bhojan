import Resturant from "../models/restaurentModel.js";

export const getAllRestaurents = async (req, res, next) => {
  try {
    const resturants = await Resturant.find().sort({ createdAt: -1 });

    if (!resturants || resturants.length === 0) {
      const error = new Error("No Resturants Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "All Restaurants Fetched Successfully",
      data: resturants,
    });
  } catch (error) {
    next(error);
  }
};
