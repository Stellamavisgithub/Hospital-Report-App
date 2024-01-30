"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose_1.default.connect(uri);
        const db = mongoose_1.default.connection;
        db.on('error', (error) => {
            console.error('Error connecting to MongoDB:');
            console.error(error.message);
            reject(error);
        });
        db.once('open', () => {
            console.log('Connected to MongoDB');
            resolve(db);
        });
    });
};
exports.default = connectToDatabase;
