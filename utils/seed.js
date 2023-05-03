// Connects to mongoDB
const connection = require("../config/connection");
// Import Models and Schemas
const { userData, thoughtData, reactionData } = require("./data");
const { User, Thought } = require("../models");

//Seed Database
const seedDatabase = async () => {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert seed data
    const createdUsers = await User.insertMany(userData);
    const createdThoughts = await Thought.insertMany(thoughtData);

    for (let i = 0; i < createdThoughts.length; i++) {
      const thought = createdThoughts[i];
      const user = createdUsers.find(
        (user) => user.username === thought.username
      );
      user.thoughts.push(thought);
      await user.save();
    }

    for (let i = 0; i < reactionData.length; i++) {
      const reaction = reactionData[i];
      const thought = createdThoughts.find(
        (thought) => thought.username === reaction.username
      );
      thought.reactions.push(reaction);
      await thought.save();
    }

    // Add friends
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const friends = createdUsers.filter(
        (friend) => friend.username !== user.username
      );
      user.friends = friends.map((friend) => friend._id);
      await user.save();
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
