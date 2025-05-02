"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getAllBooks = void 0;
const book_model_1 = require("../models/book.model");
// Get all items
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield book_model_1.BookModel.find();
        res.send(items);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
exports.getAllBooks = getAllBooks;
// Get book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield book_model_1.BookModel.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.send(item);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
exports.getBookById = getBookById;
// Add new book
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, year } = req.body;
        const newItem = new book_model_1.BookModel({ title, author, year });
        yield newItem.save();
        res.status(201).send(newItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
exports.addBook = addBook;
// Update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const updatedItem = yield book_model_1.BookModel.findByIdAndUpdate(id, { title, author, year }, { new: true });
        if (!updatedItem) {
            return res.status(404).send("Item not found");
        }
        res.send(updatedItem);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
exports.updateBook = updateBook;
// Delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield book_model_1.BookModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.send("Item deleted successfully");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
exports.deleteBook = deleteBook;
