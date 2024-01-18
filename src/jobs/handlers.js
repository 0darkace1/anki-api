import mailService from '@/services';

const JobHandlers = {
  completePayout: async (job, done) => {
    // const { data } = job.attrs;

    // await PaymentService.completePayout(data);

    done();
  },
  sendWelcomeEmail: async (job, done) => {
    const { data } = job.attrs;

    await mailService.welcome(data);

    done();
  },
};

export default JobHandlers;
