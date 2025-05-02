import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const BookRoutes = Router();

BookRoutes.get("/", getAllBooks);
BookRoutes.get("/:id", getBookById);
BookRoutes.post("/add", addBook);
BookRoutes.put("/update/:id", updateBook);
BookRoutes.delete("/delete/:id", deleteBook);

export default BookRoutes;
