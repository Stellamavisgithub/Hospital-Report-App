// import express from 'express';
// const router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });  
// });
// export default  router

import express from 'express';
import Doctor from '../model/doctors';
const router = express.Router();
 
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Express' });
});
router.get("/login", function(req, res, next){
  res.render("login",{ title: "loginPage"});
});
router.get("/signup", function(req, res, next){
  res.render("signup",{ title: "registration Page"});
});
 
export default router;
 
