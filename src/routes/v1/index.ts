import express, { Request, Response } from "express";

import authRoutes from "./auth.route";
import adminRouter from "./admin.route";
import userRouter from "./user.route";
import learningsRouter from "./learnings.route";
import setsRouter from "./sets.route";
import cardsRouter from "./cards.route";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "ANKI CLONE API - v1" });
});

apiRouter.get("/auth", authRoutes);
apiRouter.use("/admin", adminRouter);

apiRouter.use("/user", userRouter);
apiRouter.use("/learnings", learningsRouter);
apiRouter.use("/sets", setsRouter);
apiRouter.use("/cards", cardsRouter);

export default apiRouter;
