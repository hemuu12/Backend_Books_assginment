const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String },
    author:{type : String},
    year:{type: Number},

  },
  { versionKey: false }
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = {
  BookModel,
};