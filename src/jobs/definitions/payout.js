const { JobHandlers } = require('../handlers');

const payoutDefinitions = (agenda) => {
  agenda.define('send-welcome-mail', JobHandlers.sendWelcomeEmail);

  agenda.define('reset-otp-mail', JobHandlers.sendOTPEmail);

  agenda.define(
    'payout-info',
    {
      priority: 'high',
      concurrency: 20,
    },
    JobHandlers.monthlyBillingInformation
  );
};

module.exports = { payoutDefinitions };
