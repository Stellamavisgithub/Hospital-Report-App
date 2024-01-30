import mongoose, { Connection } from 'mongoose';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

const connectToDatabase = (): Promise<Connection> => {
  return new Promise<Connection>((resolve, reject) => {
    mongoose.connect(uri,);

    const db = mongoose.connection;

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

export default connectToDatabase;
