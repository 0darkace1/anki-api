import httpStatus from "http-status";
import { Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync.utils";

import adminService from "../services/admin.service";

const adminController = {
  init: catchAsync(async (req: Request, res: Response, next) => {
    const result = await adminService.initDatabase(req, res, next);

    return res.status(httpStatus.CREATED).send(result);
  }),
};

export default adminController;
