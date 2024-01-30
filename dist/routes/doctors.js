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
const express_1 = __importDefault(require("express"));
const doctors_1 = require("../controller/doctors");
const authe_1 = require("../auth/authe");
const doctors_2 = __importDefault(require("../model/doctors"));
const router = express_1.default.Router();
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = yield doctors_2.default.find();
        res.status(200).send(doctor);
    });
});
router.post("/signup", doctors_1.signup);
router.post("/signup", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctor = yield doctors_2.default.create();
        res.status(200).json({
            message: "hello"
        });
    });
});
router.post("/login", doctors_1.login);
router.put("/update", authe_1.auth, doctors_1.updateDoctor);
router.get("/:id", doctors_1.getDoctorInfo); // New route for getting user information
router.delete("/:id", authe_1.auth, doctors_1.deleteDoctor); // New route for deleting a user
router.get("/example", function (req, res, next) {
    res.json({
        message: "This is an example route",
        data: "No data",
    });
});
exports.default = router;
