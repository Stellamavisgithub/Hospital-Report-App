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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReport = exports.updateReport = exports.getOneReport = exports.getMyReports = exports.createReport = void 0;
const report_1 = __importDefault(require("../model/report"));
function createReport(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract necessary data from req.body
            const { patientId, patientName, age, hospitalName, weight, height, bloodPressure, genotype, bloodGroup, HIV_status, hepatitis } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.toString();
            if (!userId) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: 'Unauthorized',
                });
            }
            const newReport = new report_1.default({
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
            const savedReport = yield newReport.save();
            return res.status(201).json({
                message: 'Report created successfully',
                data: savedReport,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    });
}
exports.createReport = createReport;
function getMyReports(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.toString();
            if (!userId) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: 'Unauthorized',
                });
            }
            const reports = yield report_1.default.find({ userId });
            return res.json({
                message: 'Reports retrieved successfully',
                data: reports,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    });
}
exports.getMyReports = getMyReports;
function getOneReport(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.toString();
            const reportId = req.params.reportId;
            if (!userId) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: 'Unauthorized',
                });
            }
            const report = yield report_1.default.findOne({ _id: reportId, userId });
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
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    });
}
exports.getOneReport = getOneReport;
function updateReport(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.toString();
            const reportId = req.params.reportId;
            const updatedData = req.body;
            if (!userId) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: 'Unauthorized',
                });
            }
            const report = yield report_1.default.findOneAndUpdate({ _id: reportId, userId }, updatedData, { new: true });
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
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    });
}
exports.updateReport = updateReport;
function removeReport(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.toString();
            const reportId = req.params.reportId;
            if (!userId) {
                return res.status(401).json({
                    message: 'Invalid token',
                    error: 'Unauthorized',
                });
            }
            const report = yield report_1.default.findOneAndDelete({ _id: reportId, userId });
            if (!report) {
                return res.status(404).json({
                    message: 'Report not found',
                    error: 'Not found',
                });
            }
            return res.json({
                message: 'Report deleted successfully',
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message,
            });
        }
    });
}
exports.removeReport = removeReport;
