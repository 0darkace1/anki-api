import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";

import config from "../config/config";
import logger from "../config/logger";

const emailsDir = path.resolve(process.cwd(), "src/templates");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const emailFile = fs.readFileSync(
    path.join(emailsDir, "reset.template.html"),
    {
      encoding: "utf8",
    }
  );
  const emailTemplate = Handlebars.compile(emailFile);

  const resetPasswordUrl = `${config.app.url}/reset-password?token=${token}`;

  await transport.sendMail({
    from: `${config.app.name} ${config.email.from}`,
    to,
    subject: `Reset Password - ${config.app.name}`,
    html: emailTemplate({
      APP_NAME: config.app.name,
      APP_LOGO: config.app.logo,
      APP_COLOR: config.app.color,
      RESET_PASSWORD_URL: resetPasswordUrl,
    }),
  });
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to: string, token: string) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const emailFile = fs.readFileSync(
    path.join(emailsDir, "verification.template.html"),
    {
      encoding: "utf8",
    }
  );
  const emailTemplate = Handlebars.compile(emailFile);

  const verificationEmailUrl = `${config.app.url}/verify-email?token=${token}`;

  await transport.sendMail({
    from: `${config.app.name} ${config.email.from}`,
    to,
    subject: `Email Verification - ${config.app.name}`,
    html: emailTemplate({
      APP_NAME: config.app.name,
      APP_LOGO: config.app.logo,
      APP_COLOR: config.app.color,
      VERIFICATION_EMAIL_URL: verificationEmailUrl,
    }),
  });
};

/**
 * Send welcome email
 * @param {string} to
 * @returns {Promise}
 */
const sendWelcomeEmail = async (to: string) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const emailFile = fs.readFileSync(
    path.join(emailsDir, "welcome.template.html"),
    {
      encoding: "utf8",
    }
  );
  const emailTemplate = Handlebars.compile(emailFile);

  await transport.sendMail({
    from: `${config.app.name} ${config.email.from}`,
    to,
    subject: `Welcome to ${config.app.name} 👋`,
    html: emailTemplate({
      APP_NAME: config.app.name,
      APP_LOGO: config.app.logo,
      APP_COLOR: config.app.color,
      APP_URL: config.app.url,
    }),
  });
};

export default {
  transport,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
};
