const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var jwt = require("jsonwebtoken");
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
    const allClassesCollection = db.collection("allClasses");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //varify token middle ware
    const verifyToken = (req, res, next) => {
      console.log("inside Verify token", req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // use varified admin after varified token
    const varifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // app.get("/users/admin/:email", verifyToken, async (req, res) => {
    //   const email = req.params.email;
    //   if (email !== req.decoded.email) {
    //     return res.status(403).send({ message: "unauthorized access" });
    //   }
    //   const query = { email: email };
    //   const user = await userCollection.findOne(query);
    //   let admin = false;
    //   if (user) {
    //     admin = user?.role === "admin";
    //   }
    //   res.send({ admin });
    // });

    app.get("/users/role/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      // Ensure the email from the token matches the requested email
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Unauthorized access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);

      if (user) {
        res.send({ role: user.role }); // Return the user's role
      } else {
        res.status(404).send({ message: "User not found" });
      }
    });

    // app.patch("/users/admin/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updatedDoc = {
    //     $set: { role: "admin" }, // Update the 'role' field to 'admin'
    //   };
    //   try {
    //     const result = await userCollection.updateOne(filter, updatedDoc);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error updating user role:", error);
    //     res.status(500).send({ message: "Failed to update user role." });
    //   }
    // });

    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body; // Role passed in the request body

      // Validate that the role is one of the allowed roles
      if (!["admin", "trainer", "member"].includes(role)) {
        return res.status(400).send({ message: "Invalid role specified." });
      }

      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { role: role }, // Dynamically set the 'role' field
      };

      try {
        const result = await userCollection.updateOne(filter, updatedDoc);
        if (result.modifiedCount > 0) {
          res.send({ success: true, message: `Role updated to ${role}` });
        } else {
          res
            .status(404)
            .send({ message: "User not found or role unchanged." });
        }
      } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ message: "Failed to update user role." });
      }
    });

    // users related api
    app.get("/users", verifyToken, varifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "Use Allready exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: { role: "admin" }, // Update the 'role' field to 'admin'
      };
      try {
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ message: "Failed to update user role." });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Example route for fetching classes with pagination (Node.js with Express)

    app.get("/classesInfo", async (req, res) => {
      const result = await allClassesCollection.find().toArray();
      res.send(result);
    });

    app.get("/classesInfo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await allClassesCollection.findOne({
        _id: new ObjectId(id),
      });
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
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    app.get("/trainersInfo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await allTrainersCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.get("/trainersInfo", async (req, res) => {
      const result = await allTrainersCollection.find().toArray();
      res.send(result);
    });

    app.put("/trainersInfo/:trainerId/updateRole", async (req, res) => {
      const { trainerId } = req.params;
      const { role } = req.body;

      try {
        // Validate request
        if (!role) {
          return res
            .status(400)
            .json({ message: "Role is required in the request body." });
        }

        // Check if the trainer exists
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
          return res.status(404).json({ message: "Trainer not found." });
        }

        // Update the role
        trainer.role = role;
        await trainer.save();

        res
          .status(200)
          .json({ message: "Trainer role updated successfully", trainer });
      } catch (error) {
        console.error("Error updating trainer role:", error); // Log error details for debugging
        res
          .status(500)
          .json({
            message: "Error updating trainer role",
            error: error.message,
          });
      }
    });

    // POST request to save trainer info
    app.post("/trainersInfo", async (req, res) => {
      const trainerData = req.body;
      const result = await allTrainersCollection.insertOne(trainerData);
      res.send(result);
    });

    // POST route to save payment data
    app.post("/paymentData", async (req, res) => {
      const paymentData = req.body;
      const result = await paymentDataCollection.insertOne(paymentData);
      res.send(result);
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

    app.get("/posts", async (req, res) => {
      const { page = 1, limit = 6 } = req.query; // Defaults to page 1 and 6 posts per page
      const skip = (page - 1) * limit;
      const posts = await Post.find().skip(skip).limit(limit).exec();
      const totalPosts = await Post.countDocuments();
      res.json({ posts, totalPosts });
    });

    app.post("/posts/:postId/vote", async (req, res) => {
      const { postId } = req.params;
      const { voteType } = req.body; // 'upvote' or 'downvote'
      const userId = req.user._id; // Assuming you have user authentication

      const post = await Post.findById(postId);
      if (voteType === "upvote") {
        post.votes.upvotes += 1;
      } else if (voteType === "downvote") {
        post.votes.downvotes += 1;
      }
      await post.save();
      res.json(post);
    });

    // POST route to save a trainer's application
    app.post("/api/trainers", async (req, res) => {
      const trainerData = req.body;
      try {
        const result = await allTrainersCollection.insertOne(trainerData);
        res.status(201).send({
          message: "Trainer application submitted successfully!",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error saving trainer data:", error);
        res.status(500).send({ error: "Failed to submit application." });
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
