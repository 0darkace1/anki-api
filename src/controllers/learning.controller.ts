import httpStatus from "http-status";

import { catchAsync } from "../utils/catchAsync.utils";

import adminService from "../services/admin.service";

const learningController = {
  init: catchAsync(async (req, res) => {
    const result = await adminService.initDatabase();

    return res.status(httpStatus.CREATED).send(result);
  }),
};

export default learningController;
