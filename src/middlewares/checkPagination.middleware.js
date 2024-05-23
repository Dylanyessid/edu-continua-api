import { isDefined } from "../helpers/isDefined.js";
import { isNumber } from "../helpers/isNumber.js";

export const checkPaginationMiddleware = (req, res, next) => {
  const { taking, skip } = req.query;

  if (!isDefined(taking) || !isDefined(skip) || !isNumber(taking) || !isNumber(skip)) {
    return res
    .status(400)
    .json({ 
      isSuccess: false, 
      message: "Please provide correct values for pagination. Example: /10/0. This will take 10 elements of each service, starting of id 1. You will get 40 total objects" 
    });
  }

  next();
}