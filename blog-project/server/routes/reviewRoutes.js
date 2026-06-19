import {Router} from "express";
import {postReview,destroyReview} from "../controllers/reviewController.js";
import { checkAuth } from "../middlewares/authMiddlewares.js";

const reviewRouter=Router();

reviewRouter.post("/:id", checkAuth,  postReview);
reviewRouter.delete("/:id/:reviewId",checkAuth, destroyReview);
export default reviewRouter;