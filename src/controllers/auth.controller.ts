import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { authService, userService, tokenService, emailService } from '../services';
import { catchAsync } from '@/utils';

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  await emailService.sendWelcomeEmail(user.email);

  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userAgent = req.headers['user-agent'];
  // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user, userAgent);

  res.send({ user, tokens });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);

  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);

  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);

  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req: any, res: any) => {
  await authService.resetPassword(req.query.token, req.body.password);

  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req: any, res: any) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);

  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);

  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req: any, res: any) => {
  await authService.verifyEmail(req.query.token);

  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
