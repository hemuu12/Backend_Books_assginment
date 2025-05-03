import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import BookRoutes from './routes/book.routes';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Test Route
app.use("/hello", (_req, res) => {
  res.send("Hello World");
});


app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Hello from Express in a Serverless function!' });
});




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/book', BookRoutes);



// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 