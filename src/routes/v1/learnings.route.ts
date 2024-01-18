import express, { Request, Response } from 'express';

import Learnings from '@/models/learning.model';

const learningsRouter = express.Router();

// TODO: VALIDATE ALL INCOMING DATA
// TODO: VERIFY IF CONNECTED & USER PERMISSIONS

// Get all learnings
learningsRouter.get('/', async (req: Request, res: Response) => {
  try {
    console.log({ url: 'GET /learnings', body: req.body });

    const learnings = await Learnings.find();

    return res.json(learnings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a single learning
learningsRouter.get('/:learningId', async (req: Request, res: Response) => {
  try {
    const { learningId } = req.params;

    console.log({ url: 'GET /learnings/:cardId', body: req.body });

    const learning = await Learnings.findById(learningId).populate('set');

    return res.json(learning);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a learning
learningsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { user, cards_total, cards_wrong, cards_success, set } = req.body;

    console.log({ url: 'POST /learnings', body: req.body });

    const obj = {
      user,
      set,
      cards_total: +cards_total,
      cards_wrong: +cards_wrong,
      cards_success: +cards_success,
      score: (+cards_success / +cards_total) * 100,
    };

    const newLearning = new Learnings(obj);

    await newLearning.save();

    return res.json(newLearning);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a learning
learningsRouter.patch('/:learningId', async (req: Request, res: Response) => {
  try {
    const { learningId } = req.params;
    const { user, score, cards_total, cards_wrong, cards_success, set } = req.body;

    console.log({ url: 'POST /learnings/:cardId', body: req.body });

    const updatedLearning = await Learnings.findByIdAndUpdate(learningId, {
      user,
      score,
      cards_total,
      cards_wrong,
      cards_success,
      set,
    });

    return res.json(updatedLearning);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a learning by id
learningsRouter.delete('/:learningId', async (req: Request, res: Response) => {
  try {
    const { learningId } = req.params;

    console.log({ url: 'DELETE /learnings/:cardId', body: req.body });

    const deletedLearning = await Learnings.findByIdAndDelete(learningId);

    if (deletedLearning) {
      return res.json(deletedLearning);
    }

    return res.status(404).json({
      error: 'Not Found',
      message: 'Unable to delete, this learning does not exist.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default learningsRouter;
