import { seedDatabase } from "../seed";
import { catchAsync } from "../utils/catchAsync.utils";

import Cards from "../models/card.model";
import Sets from "../models/topic.model";
import UserSets from "../models/userTopic.model";
import Learnings from "../models/learning.model";

const initDatabase = catchAsync(async () => {
  await Cards.collection.drop();
  await Learnings.collection.drop();
  await Sets.collection.drop();
  await UserSets.collection.drop();

  await seedDatabase();

  return { message: "Successfully initialized!" };
});

export default { initDatabase };
