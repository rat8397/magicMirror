import express from "express";
import routes from "../routes"
import { getTest } from "../controllers/testController";

const testRouter = express.Router();

testRouter.get(routes.test,getTest)

export default testRouter;