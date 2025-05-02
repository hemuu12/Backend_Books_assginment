import { Request, Response } from "express";
import { BookModel } from "../models/book.model";

// Get all items
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const items = await BookModel.find();
    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const item = await BookModel.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Add new book
export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, year } = req.body;
    const newItem = new BookModel({ title, author, year });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
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
};

// Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const item = await BookModel.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.send("Item deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
