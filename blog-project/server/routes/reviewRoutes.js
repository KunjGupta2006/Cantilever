import {Router} from "express";
import {postReview,destroyReview} from "../controllers/reviewController.js";
import { checkAuth } from "../middlewares/authMiddlewares.js";

const reviewRouter=Router();

reviewRouter.post("/:id", checkAuth,  postReview);//TODO add auth check
reviewRouter.delete("/:id/:reviewId",checkAuth, destroyReview);//TODO add auth check
export default reviewRouter;