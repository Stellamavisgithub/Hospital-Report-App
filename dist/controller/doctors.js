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
exports.deleteDoctor = exports.getDoctorInfo = exports.updateDoctor = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const doctors_1 = __importDefault(require("../model/doctors"));
const jwt_1 = require("../utils/jwt");
const joi_1 = __importDefault(require("joi"));
const signupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    specialization: joi_1.default.string().required(),
    gender: joi_1.default.string(),
    phone: joi_1.default.string(),
});
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password, email, specialization, gender, phone } = req.body;
        try {
            const validatedData = yield signupSchema.validateAsync(req.body);
            if (!name || !password || !email) {
                return res.status(400).json({
                    message: "name, password, and email are required",
                    error: "Bad request",
                });
            }
            const currentDoctor = yield doctors_1.default.findOne({
                email: email.toLowerCase().trim(),
            });
            if (currentDoctor) {
                return res.status(409).json({
                    message: "email already exists",
                    error: "Conflict: Login instead?",
                });
            }
            const id = (0, uuid_1.v4)();
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const doctor = yield doctors_1.default.create({
                id,
                name,
                password: hash,
                email,
                specialization,
                phone,
                gender,
            });
            const token = (0, jwt_1.generateToken)(id);
            res.cookie("token", token, { httpOnly: true, maxAge: 3603400123 });
            return res.status(201).json({
                message: "User created successfully",
                data: doctor,
                token,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.status(400).json({
                    message: "email and password required",
                    error: "Bad request",
                });
            }
            const doctor = yield doctors_1.default.findOne({
                email: email.toLowerCase().trim(),
            });
            if (!doctor) {
                return res.status(404).json({
                    message: "Doctor not found",
                    error: "Not found",
                });
            }
            const match = bcrypt_1.default.compareSync(password, doctor.password);
            if (!match) {
                return res.status(401).json({
                    message: "Invalid credentials",
                    error: "Unauthorized",
                });
            }
            const token = (0, jwt_1.generateToken)(doctor.id);
            res.cookie("token", token, { httpOnly: true, maxAge: 3600000123 });
            return res.json({
                message: "Login successful",
                data: doctor,
                token,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    });
}
exports.login = login;
// ... (previous code)
function updateDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password } = req.body;
            if (!req.user) {
                return res.status(401).json({
                    message: "Invalid token",
                    error: "Unauthorized",
                });
            }
            const doctor = yield doctors_1.default.findById(req.user);
            if (!doctor) {
                return res.status(404).json({
                    message: "User not found",
                    error: "Not found",
                });
            }
            if (name) {
                doctor.name = name;
                yield doctor.save();
            }
            if (password) {
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = bcrypt_1.default.hashSync(password, salt);
                doctor.password = hash;
                yield doctor.save();
            }
            return res.status(201).json({
                message: "User updated",
                data: doctor,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    });
}
exports.updateDoctor = updateDoctor;
function getDoctorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const doctor = yield doctors_1.default.findById(id);
            if (!doctor) {
                return res.status(404).json({
                    message: "User not found",
                    error: "Not found",
                });
            }
            return res.json({
                message: "User information retrieved",
                data: doctor,
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    });
}
exports.getDoctorInfo = getDoctorInfo;
function deleteDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "Invalid token",
                    error: "Unauthorized",
                });
            }
            const id = req.params.id;
            const doctor = yield doctors_1.default.findById(id);
            if (!doctor) {
                return res.status(404).json({
                    message: "User not found",
                    error: "Not found",
                });
            }
            // Additional check to ensure the authenticated user is deleting their own account
            if (req.user !== id) {
                return res.status(403).json({
                    message: "Forbidden",
                    error: "You are not allowed to delete this user",
                });
            }
            yield doctor.deleteOne({ _id: doctor._id });
            return res.json({
                message: "User deleted successfully",
            });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    });
}
exports.deleteDoctor = deleteDoctor;
