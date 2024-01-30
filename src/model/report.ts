import mongoose, { Schema, Document } from 'mongoose';

interface IReport extends Document {
  patientId: string;
  patientName: string;
  age: number;
  hospitalName: string;
  weight: string;
  height: string;
  bloodPressure: string;
  genotype: string | null;
  bloodGroup: string;
  HIV_status: string | null;
  hepatitis: string;
  userId: string;
}

const reportSchema = new Schema<IReport>(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    patientName: {
      type: String,
    },
    age: {
      type: Number,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    genotype: {
      type: String,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    HIV_status: {
      type: String,
    },
    hepatitis: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

const ReportModel = mongoose.model<IReport>('Report', reportSchema);

export { IReport };

export default ReportModel;
