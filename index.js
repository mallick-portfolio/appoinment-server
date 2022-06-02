const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.nvbp2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const appoinmentCollection = client
      .db("appoinmentDB")
      .collection("appoinments");
    // create a document to insert

    app.get("/appoinments", async (req, res) => {
      const appoinments = await appoinmentCollection.find().toArray();
      res.send(appoinments);
    });

    app.post("/appoinments", async (req, res) => {
      const newAppoinment = req.body;
      const setAppoinment = await appoinmentCollection.insertOne(newAppoinment);
      res.send(setAppoinment);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
