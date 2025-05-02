import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  year: number;
}

const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { versionKey: false }
);

export const BookModel: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);
