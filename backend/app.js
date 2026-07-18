const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { getStoredItems, storeItems } = require("./data/items");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://myntra-clone-cnuu.vercel.app"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/items", async (req, res) => {
  const storedItems = await getStoredItems();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 4000));
  res.json({ items: storedItems });
});

app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

// app.listen(8080);

module.exports = app;
