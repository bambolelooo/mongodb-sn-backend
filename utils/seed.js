// import mongoose and the model
const connection = require("../config/connection");
const mongoose = require("mongoose");
const { Thought, User } = require("../models");

// connect to MongoDB using Mongoose
connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  const users = [
    {
      username: "johndoe",
      email: "johndoe@example.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "janedoe",
      email: "janedoe@example.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "bobsmith",
      email: "bobsmith@example.com",
      thoughts: [],
      friends: [],
    },
  ];
  // create some thoughts with reactions
  const thoughts = [
    {
      thoughtText: "I love coding!",
      username: "coder123",
      reactions: [
        {
          reactionBody: "Me too!",
          username: "dev456",
        },
        {
          reactionBody: "That is awesome!",
          username: "codingfan",
        },
      ],
    },
    {
      thoughtText: "I hate Mondays!",
      username: "grumpycat",
      reactions: [
        {
          reactionBody: "Same here!",
          username: "sleepyhead",
        },
        {
          reactionBody: "Mondays are the worst!",
          username: "weekendwarrior",
        },
      ],
    },
  ];

  // insert the thoughts into the database
  try {
    await Thought.deleteMany({});
    console.log("--thought");
    await User.deleteMany({});
    console.log("--user");
    await Thought.collection.insertMany(thoughts);
    console.log("++thought");
    await User.collection.insertMany(users);
    console.log("++user");
  } catch (e) {
    console.log(e);
  }
  process.exit(0);
  // Thought.deleteMany({})
  //   .then(() => {
  //     Thought.collection.insertMany(thoughts);
  //   })
  //   .then(() => {
  //     console.log("Seeded the database with thoughts!");
  //   })
  //   .then(() => {
  //     console.log("--users");
  //     User.deleteMany({});
  //   })
  //   .then(() => {
  //     console.log(">>users");
  //     User.collection.insertMany(users);
  //   })
  //   .then(() => {
  //     console.log("Seeded the database with users!");
  //     process.exit();
  //   })
  //   .catch((error) => console.error("Error seeding the database:", error));
});
