import { Request, Response } from 'express';
import ReportModel, { IReport } from '../model/report';

export async function createReport(req: Request, res: Response) {
  try {
    // Extract necessary data from req.body
    const { patientId, patientName, age, hospitalName, weight, height, bloodPressure, genotype, bloodGroup, HIV_status, hepatitis } = req.body;
    const userId = req.user?.toString();

    if (!userId) {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    const newReport: IReport = new ReportModel({
      patientId,
      patientName,
      age,
      hospitalName,
      weight,
      height,
      bloodPressure,
      genotype,
      bloodGroup,
      HIV_status,
      hepatitis,
      userId,
    });

    const savedReport = await newReport.save();

    return res.status(201).json({
      message: 'Report created successfully',
      data: savedReport,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

export async function getMyReports(req: Request, res: Response) {
  try {
    const userId = req.user?.toString();

    if (!userId) {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    const reports = await ReportModel.find({ userId });

    return res.json({
      message: 'Reports retrieved successfully',
      data: reports,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

export async function getOneReport(req: Request, res: Response) {
  try {
    const userId = req.user?.toString();
    const reportId = req.params.reportId;

    if (!userId) {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    const report = await ReportModel.findOne({ _id: reportId, userId });

    if (!report) {
      return res.status(404).json({
        message: 'Report not found',
        error: 'Not found',
      });
    }

    return res.json({
      message: 'Report retrieved successfully',
      data: report,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

export async function updateReport(req: Request, res: Response) {
  try {
    const userId = req.user?.toString();
    const reportId = req.params.reportId;
    const updatedData = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    const report = await ReportModel.findOneAndUpdate({ _id: reportId, userId }, updatedData, { new: true });

    if (!report) {
      return res.status(404).json({
        message: 'Report not found',
        error: 'Not found',
      });
    }

    return res.json({
      message: 'Report updated successfully',
      data: report,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

export async function removeReport(req: Request, res: Response) {
  try {
    const userId = req.user?.toString();
    const reportId = req.params.reportId;

    if (!userId) {
      return res.status(401).json({
        message: 'Invalid token',
        error: 'Unauthorized',
      });
    }

    const report = await ReportModel.findOneAndDelete({ _id: reportId, userId });

    if (!report) {
      return res.status(404).json({
        message: 'Report not found',
        error: 'Not found',
      });
    }

    return res.json({
      message: 'Report deleted successfully',
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}
