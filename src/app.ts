import path from 'path';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import helmet, { xssFilter } from 'helmet';

import config from '@/config/config';
import morgan from '@/config/morgan';
import jwtStrategy from '@/config/passport';
import { authLimiter } from '@/middlewares/rateLimiter';
import routes from '@/routes/v1';
import { errorConverter, errorHandler } from '@/middlewares/error';
import { ApiError } from '@/utils';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xssFilter());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// static public uploads route
app.use(`/${config.upload.folder}`, express.static(path.resolve(process.cwd(), config.upload.folder)));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
