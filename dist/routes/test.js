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
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000; // Choose a suitable port
// Connection URI
const uri = 'mongodb://localhost:27017/test';
// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Define the route to search for doctors
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the MongoDB server
        yield client.connect();
        console.log('Connected to the database');
        // Access the database
        const database = client.db();
        // Access the collection (replace 'doctors' with your actual collection name)
        const doctorsCollection = database.collection('doctors');
        // Search for doctors
        const doctors = yield doctorsCollection.find().toArray();
        // Send the results as JSON
        res.json({ doctors });
    }
    catch (error) {
        console.error('Error searching for doctors:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        // Close the connection when done
        yield client.close();
        console.log('Connection closed');
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
