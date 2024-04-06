const express = require("express");
const { BookModel } = require("../models/bookData.model.js");

const BookRouter = express.Router();


// Get all items
BookRouter.get("/", async (req, res) => {
  try {
    const items = await BookModel.find();
    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Get item by ID
BookRouter.get("/:id", async (req, res) => {
  try {
    const item = await BookModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
// Create a new item
BookRouter.post("/add", async (req, res) => {
    try {
      const newItem = new BookModel({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
      });

      await newItem.save();
      res.status(201).send(newItem);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

// Update item by ID
BookRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    // Find the item by its _id and update it
    const updatedItem = await BookModel.findByIdAndUpdate(
      id,
      { title, author, year },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send("Item not found");
    }

    res.send(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// Delete item by ID
BookRouter.delete("/delete/:id", async (req, res) => {
  try {
    const item = await BookModel.findOneAndDelete({ _id: req.params.id });
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send("Item deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = {
  BookRouter,
};