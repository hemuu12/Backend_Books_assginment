"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
// import { errorHandler, routeMiddleware } from './middleware';
// import { clientUse } from 'valid-ip-scope';
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route Middleware
// app.use(clientUse());
// app.use(routeMiddleware);
// Test Route
app.use("/hello", (_req, res) => {
    res.send("Hello World");
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/book', book_routes_1.default);
// Error handling
// app.use(errorHandler);
console.log("process.env", process.env.MONGODB_URI);
// Database connection
mongoose_1.default
    .connect(process.env.MONGODB_URI)
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
