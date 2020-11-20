const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const Bookmark = require("./models/bookmark");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5005;
app.use(express.json());
app.use(cors());

async function AddNewBookmark(client, newEntry) {
  const addedBookmark = client
    .db("bookmarks")
    .collection("items")
    .insertOne(newEntry);
  return addedBookmark;
}

async function FetchAllBookmarks(client) {
  const cursor = client.db("bookmarks").collection("items").find({});
  const data = await cursor.toArray();
  return data;
}

// fetches all data from db and sends to client
app.get("/saved-bookmarks", async (_req, res) => {
  try {
    const data = await FetchAllBookmarks(client);
    res.json(data);
  } catch (error) {
    throw error;
  }
});

app.post("/new", async (req, _res) => {
  const newEntry = new Bookmark({
    title: req.body.title,
    link: req.body.link,
    time: req.body.time,
  });
  try {
    const result = await AddNewBookmark(client, newEntry);
    return result;
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

async function main(client) {
  try {
    await client.connect();
    console.log("mongoDB connected!");
  } catch (error) {
    console.log(error);
  }
}

main(client).catch(console.error);
