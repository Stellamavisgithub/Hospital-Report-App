"use strict";
// import express from 'express';
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });  
// });
// export default  router
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('homepage', { title: 'Express' });
});
router.get("/login", function (req, res, next) {
    res.render("login", { title: "loginPage" });
});
router.get("/signup", function (req, res, next) {
    res.render("signup", { title: "registration Page" });
});
exports.default = router;
