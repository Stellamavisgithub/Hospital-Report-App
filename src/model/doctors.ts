import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

interface IDoctor extends Document {
  name: string;
  password: string;
  email: string;
  specialization: string;
  gender: string;
  phone: string;
  username: string;
}

const doctorSchema = new Schema<IDoctor>(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
    name: {
      type: String,
      required: true,
    },
      username: {
        type: String,
        required: false,
        unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true, 
  }
);

const DoctorModel = mongoose.model<IDoctor>('doctors', doctorSchema);

export { IDoctor };

export default DoctorModel;

