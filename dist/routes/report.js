"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_1 = require("../controller/report");
const authe_1 = require("../auth/authe");
const router = (0, express_1.Router)();
router.post('/', authe_1.auth, report_1.createReport);
router.get('/mine', authe_1.auth, report_1.getMyReports);
router.get('/one/:reportId', authe_1.auth, report_1.getOneReport);
router.put('/:reportId', authe_1.auth, report_1.updateReport);
router.delete('/:reportId', authe_1.auth, report_1.removeReport);
//router.get('/dashboard', async(req, res, next) => {
//const doctorId = (req.session as any).doctorId
//if (!doctorId) {
//   res.redirect("doctors/login")
//  }
exports.default = router;
