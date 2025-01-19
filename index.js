const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efqwe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("ActiveHaven");
    const featuredClassesCollection = db.collection("featuredClasses");

    // GET route for featured classes sorted by total bookings
    app.get("/featuredClasses", async (req, res) => {
      const result = await featuredClassesCollection
        .aggregate([
          {
            $lookup: {
              from: "bookings",
              localField: "_id",
              foreignField: "classId",
              as: "bookingDetails",
            },
          },
          {
            $addFields: {
              totalBookings: { $size: "$bookingDetails" },
            },
          },
          {
            $sort: { totalBookings: -1 }, // Sort by total bookings in descending order
          },
          {
            $project: {
              title: 1,
              description: 1,
              bookings: "$totalBookings",
            },
          },
        ])
        .toArray();
      res.send(result);
    });

    // GET route for reviews
    const reviewCollection = db.collection("reviews");
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // All trainer Page api
    const allTrainersCollection = db.collection("allTrainers");
    // GET specific trainer
    app.get("/trainers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allTrainersCollection.findOne(query);
      res.send(result);
    });
    // GET allTrainers Data

    app.get("/trainers", async (req, res) => {
      const result = await allTrainersCollection.find().toArray();
      res.send(result);
    });

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
}
run();

// Root route
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});
