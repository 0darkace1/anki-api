const { mailDefinitions } = require('./mails');
const { payoutDefinitions } = require('./payout');

const definitions = [mailDefinitions, payoutDefinitions];

const allDefinitions = (agenda) => {
  definitions.forEach((definition) => definition(agenda));
};

module.exports = { allDefinitions };
