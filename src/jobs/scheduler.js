import { agenda } from './index';

const schedule = {
  completePayout: async (data) => {
    await agenda.schedule('in 1 minute', 'complete-payout', data);
  },
  sendWelcomeMail: async (data) => {
    await agenda.schedule('in 30 minute', 'send-welcome-mail', data);
  },

  purgeExpiredTokens: async (data) => {
    await agenda.schedule('in 30 minute', 'purge-expired-tokens', data);
  },

  // .... more methods that shedule tasks at the different intervals.
};

module.exports = { schedule };
