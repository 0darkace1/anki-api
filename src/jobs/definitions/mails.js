const { JobHandlers } = require('../handlers');

const mailDefinitions = (agenda) => {
  agenda.define('send-welcome-mail', JobHandlers.sendWelcomeEmail);

  agenda.define('reset-otp-mail', JobHandlers.sendOTPEmail);

  agenda.define(
    'billings-info',
    {
      priority: 'high',
      concurrency: 20,
    },
    JobHandlers.monthlyBillingInformation
  );
};

module.exports = { mailDefinitions };
