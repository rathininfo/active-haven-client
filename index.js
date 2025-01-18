const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efqwe.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

    const reviewCollection = client.db("ActiveHaven").collection("reviews");

    // GET route for reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
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
