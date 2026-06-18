import {Router} from "express";
import {postReview,destroyReview} from "../controllers/reviewController.js";

const reviewRouter=Router();

reviewRouter.post("/:id", postReview);//TODO add auth check
reviewRouter.delete("/:id/:reviewId", destroyReview);//TODO add auth check
export default reviewRouter;