import express from 'express';
import auth from '@/middlewares/auth';
import validate from '@/middlewares/validate';
import userValidation from '@/validations/user.validation';
import userController from '@/controllers/user.controller';

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.route('/:userId/role').put(auth('manageUsers'), validate(userValidation.changeRole), userController.changeRole);

export default router;

// import express, { Request, Response } from 'express';

// import Sets from '../../models/topic.model';
// import Cards from '../../models/card.model';

// import UserSets from '../../models/userTopic.model';
// import Users from '../../models/user.model';
// import Learnings from '../../models/learning.model';

// const userRouter = express.Router();

// // TODO: VALIDATE ALL INCOMING DATA
// // TODO: VERIFY IF CONNECTED & USER PERMISSIONS

// // ---------------------------- CRUD ------------------------------
// // Get all users
// userRouter.get('/', async (req: Request, res: Response) => {
//   try {
//     console.log({ url: 'GET /users', body: req.body });

//     const users = await Users.find();

//     return res.json(users);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Get a single user by id
// userRouter.get('/:userId', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     console.log({ url: 'GET /users/:userId', body: req.body });

//     const user = await Users.findById(userId);

//     return res.json(user);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Create an user
// userRouter.post('/', async (req: Request, res: Response) => {
//   try {
//     const { name, photo, email, password } = req.body;

//     console.log({ url: 'POST /users', body: req.body });

//     const newUser = new Users({
//       name,
//       photo,
//       email,
//       password,
//     });

//     await newUser.save();

//     return res.json(newUser);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Update an user
// userRouter.patch('/:userId', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { name, photo, email, password } = req.body;

//     console.log({ url: 'PATCH /users/:userId', body: req.body });

//     const updatedUser = await Sets.findByIdAndUpdate(userId, {
//       name,
//       photo,
//       email,
//       password,
//     });

//     return res.json(updatedUser);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Delete an user by id
// userRouter.delete('/:userId', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     console.log({ url: 'DELETE /users/:userId', body: req.body });

//     const deletedUser = await Sets.findByIdAndDelete(userId);

//     if (deletedUser) {
//       return res.json(deletedUser);
//     }

//     return res.status(404).json({
//       error: 'Not Found',
//       message: 'Unable to delete, user does not exist.',
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// // ----------------------------------------------------------------

// // -------------------------- User Sets ----------------------------
// // Get users all favorite sets
// userRouter.get('/:userId/sets', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     console.log({ url: 'GET /users/:userId/sets', body: req.body });

//     //   const userSets = await UserSets.find({ user: user });
//     const userSets = await UserSets.find({ user: userId }).populate('set');

//     res.json(userSets);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Add set to user favorites
// userRouter.post('/:userId/sets', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const { setId } = req.body;

//     console.log({ url: 'POST /users/:userId/sets', body: req.body });

//     const exist = await UserSets.findOne({ user: userId, set: setId });

//     if (exist) {
//       return res.status(200).json(exist);
//     }

//     const userSet = new UserSets({
//       user: userId,
//       set: setId,
//     });

//     userSet.save();

//     res.json(userSet);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Remove set from user favorites
// userRouter.delete('/:userId/sets/:setId', async (req: Request, res: Response) => {
//   try {
//     const { userId, setId } = req.params;

//     console.log({ url: 'DELETE /users/:userId/sets/:setId', body: req.body });

//     const deletedFavorite = await UserSets.findOneAndDelete({
//       user: userId,
//       set: setId,
//     });

//     if (deletedFavorite) {
//       return res.json(deletedFavorite);
//     }

//     return res.status(404).json({
//       error: 'Not Found',
//       message: 'Unable to remove, this favorite set does not exist.',
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
// // -----------------------------------------------------------------

// // Get users all learnings
// userRouter.get('/:userId/learnings', async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     console.log({ url: 'GET /users/:userId/learnings', body: req.body });

//     const userLearnings = await Learnings.find({ user: userId }).populate('set');

//     return res.json(userLearnings);
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// export default userRouter;
