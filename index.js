const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
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
    const db = client.db("ActiveHaven");
    const userCollection = db.collection("users");
    const featuredClassesCollection = db.collection("featuredClasses");
    const paymentDataCollection = db.collection("paymentData");
    const reviewCollection = db.collection("reviews");
    const allTrainersCollection = db.collection("allTrainers");

    // users related api
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // GET route for featured classes sorted by total bookings
    app.get("/featuredClasses", async (req, res) => {
      try {
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
              $sort: { totalBookings: -1 },
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
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch featured classes" });
      }
    });

    // GET route for reviews
    app.get("/reviews", async (req, res) => {
      try {
        const result = await reviewCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch reviews" });
      }
    });

    // All trainer Page APIs
    app.get("/trainers/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await allTrainersCollection.findOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch trainer details" });
      }
    });

    app.get("/trainers", async (req, res) => {
      try {
        const result = await allTrainersCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch trainers" });
      }
    });

    // POST route to save payment data
    app.post("/paymentData", async (req, res) => {
      const paymentData = req.body;
      try {
        const result = await paymentDataCollection.insertOne(paymentData);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to save payment data" });
      }
    });

    // Stripe payment intent route
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100); // Convert price to cents
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // Save payment info after confirmation
    app.post("/save-payment-info", async (req, res) => {
      const {
        paymentIntentId,
        trainer,
        slot,
        plan,
        userName,
        userEmail,
        price,
      } = req.body;

      try {
        const result = await paymentDataCollection.insertOne({
          paymentIntentId,
          trainer,
          slot,
          plan,
          userName,
          userEmail,
          price,
          date: new Date(),
        });

        res.send({
          success: true,
          message: "Payment information saved successfully.",
        });
      } catch (error) {
        console.error("Error saving payment information:", error);
        res.status(500).send({ error: error.message });
      }
    });

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
run().catch(console.error);

// Root route
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});
