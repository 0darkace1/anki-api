import Agenda from 'agenda';

import { allDefinitions } from './definitions';
import logger from '@/config/logger';
import config from '@/config/config';

// establised a connection to our mongoDB database.
const agenda = new Agenda({
  db: {
    address: config.mongoose.url,
    collection: 'agendaJobs',
    options: { useUnifiedTopology: true },
  },
  processEvery: '1 minute',
  maxConcurrency: 20,
});

// listen for the ready or error event.
agenda.on('ready', () => logger.log('Agenda started!')).on('error', () => logger.log('Agenda connection error!'));

// define all agenda jobs
allDefinitions(agenda);

// logs all registered jobs
logger.log({ jobs: agenda._definitions });

export default agenda;
