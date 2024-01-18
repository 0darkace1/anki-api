import httpStatus from "http-status";

import Users, { IUser } from "../models/user.model";

import ApiError from "../utils/apiError.utils";
import { catchAsync } from "../utils/catchAsync.utils";

const signUp = catchAsync(async (signUpData: any) => {
  const user = await Users.isEmailTaken(signUpData.email);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const newUser: Omit<IUser, "password"> = await new Users(signUpData).save();

  delete (newUser as Partial<Pick<IUser, "password">>).password;

  return newUser;
});

export default { signUp };
