import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import mongoose, { MongooseOptions } from 'mongoose';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    APP_URL: Joi.string().required().description('Application URL'),
    APP_LOGO: Joi.string().required().description('Application Logo'),
    APP_NAME: Joi.string().required().description('Application Name'),
    APP_COLOR: Joi.string().required().description('Application Primary Color'),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    UPLOAD_FOLDER: Joi.string().description('uploads folder name'),
    MAX_UPLOAD_FILE_SIZE: Joi.number().description('max upload file size'),
    PREPEND_UPLOAD_FILE_NAME_METHOD: Joi.string().description('upload filename prepend method'),
    PREPEND_UPLOAD_FILE_NAME_RANDOM_STRING_LENGTH: Joi.number().description('upload filename prepend random string length'),
    ALLOW_UPLOAD_FILE_TYPE: Joi.string().description('allowed file types'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  app: {
    url: envVars.APP_URL,
    logo: envVars.APP_LOGO,
    name: envVars.APP_NAME,
    color: envVars.APP_COLOR,
  },
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: <MongooseOptions>{},
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  upload: {
    folder: envVars.UPLOAD_FOLDER,
  },
  file: {
    maxUploadSize: Number(envVars.MAX_UPLOAD_FILE_SIZE * 1024 * 1024),
    prependUploadFilenameMethod: envVars.PREPEND_UPLOAD_FILE_NAME_METHOD,
    randomStringLength: Number(envVars.PREPEND_UPLOAD_FILE_NAME_RANDOM_STRING_LENGTH),
    allowUploadFileType: envVars.ALLOW_UPLOAD_FILE_TYPE,
  },
};
