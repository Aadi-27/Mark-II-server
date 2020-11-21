const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const Bookmark = require("./models/bookmark");
const webPush = require("web-push");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5005;
app.use(express.json());
app.use(cors());

// CRUD operations in bookmarks items
async function AddNewBookmark(client, newEntry) {
  const addedBookmark = await client
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

async function AddNewSubscription(client, newSub) {
  const addedSub = await client
    .db("bookmarks")
    .collection("subs")
    .insertOne(newSub);
  return addedSub;
}

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

// CRUD operations in bookmarks subs
app.post("/api/save-subscription/", async (req, res) => {
  try {
    const result = await AddNewSubscription(client, req.body);
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
