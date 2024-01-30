import express from 'express';
import { signup, login, updateDoctor, getDoctorInfo, deleteDoctor } from "../controller/doctors";
import { auth } from "../auth/authe";
import DoctorModel, { IDoctor } from '../model/doctors';



const router = express.Router();

router.get('/', async function(req, res, next) {
  const doctor = await DoctorModel.find()
 res.status(200).send(doctor);
});

router.post("/signup", signup);

router.post("/signup", async function(req, res, next){
   const doctor = await DoctorModel.create();
  res.status(200).json({
    message: "hello"
  });
}
 );


router.post("/login", login);
router.put("/update", auth, updateDoctor);
router.get("/:id", getDoctorInfo); // New route for getting user information
router.delete("/:id", auth, deleteDoctor); // New route for deleting a user

router.get("/example", function(req, res, next) {
  res.json({
    message: "This is an example route",
    data: "No data",
  });
});

export default router;

