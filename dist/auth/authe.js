"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_1 = require("../utils/jwt");
const auth = (req, res, next) => {
    var _a;
    try {
        const token = req.cookies.token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                error: "Unauthorised",
            });
        }
        const verify = (0, jwt_1.verifyToken)(token);
        if (!verify) {
            return res.status(401).json({
                message: "Invalid token",
                error: "Unauthorised",
            });
        }
        req.user = verify;
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};
exports.auth = auth;
