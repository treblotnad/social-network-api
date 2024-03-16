const connection = require("../config/connection");
const { User } = require("../models");
const { Thought} = require("../models/Thought");
// const { getRandomName, getRandomAssignments } = require('./data');

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  // user data
  const users = [
    { userName: "dant", email: "dan@gmail.com" },
    { userName: "alyssa", email: "alyssa@gmail.com" },
  ];

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.insertMany([
    {
      thoughtText: "Something Clever",
    },
    { thoughtText: "something not clever" },
  ]);

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
