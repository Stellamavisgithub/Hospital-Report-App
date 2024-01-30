import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import DoctorModel, { IDoctor } from "../model/doctors";
import { generateToken } from "../utils/jwt";
import Joi from "joi";

const signupSchema = Joi.object({
   name: Joi.string().required(),
   password: Joi.string().required(),
   email: Joi.string().email().required(),
   specialization: Joi.string().required(),
   gender: Joi.string(),
   phone: Joi.string(),
});

export async function signup(req: Request, res: Response) {
   const { name, password, email, specialization, gender, phone } = req.body;

   try {
    const validatedData = await signupSchema.validateAsync(req.body);
    
      if (!name || !password || !email) {
         return res.status(400).json({
            message: "name, password, and email are required",
            error: "Bad request",
         });
      }

      const currentDoctor = await DoctorModel.findOne({
         email: email.toLowerCase().trim(),
      });
      if (currentDoctor) {
         return res.status(409).json({
            message: "email already exists",
            error: "Conflict: Login instead?",
         });
      }

      const id = uuidv4();
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(password, salt);

      const doctor: IDoctor = await DoctorModel.create({
         id,
         name,
         password: hash,
         email,
         specialization,
         phone,
         gender,
      });

      const token = generateToken(id);

      res.cookie("token", token, { httpOnly: true, maxAge: 3603400123 });

      return res.status(201).json({
         message: "User created successfully",
         data: doctor,
         token,
      });
   } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({
         message: "Internal server error",
         error: err.message,
      });
   }
}

export async function login(req: Request, res: Response) {
   try {
      const { email, password } = req.body;
      if (!(email && password)) {
         return res.status(400).json({
            message: "email and password required",
            error: "Bad request",
         });
      }

      const doctor = await DoctorModel.findOne({
         email: email.toLowerCase().trim(),
      });
      if (!doctor) {
         return res.status(404).json({
            message: "Doctor not found",
            error: "Not found",
         });
      }

      const match = bcrypt.compareSync(password, doctor.password);

      if (!match) {
         return res.status(401).json({
            message: "Invalid credentials",
            error: "Unauthorized",
         });
      }

      const token = generateToken(doctor.id);

      res.cookie("token", token, { httpOnly: true, maxAge: 3600000123 });

      return res.json({
         message: "Login successful",
         data: doctor,
         token,
      });
   } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({
         message: "Internal server error",
         error: err.message,
      });
   }
}
// ... (previous code)

export async function updateDoctor(req: Request, res: Response) {
   try {
      
      const { name, password } = req.body;
      if (!req.user) {
         return res.status(401).json({
            message: "Invalid token",
            error: "Unauthorized",
         });
      }

      const doctor = await DoctorModel.findById(req.user);
      if (!doctor) {
         return res.status(404).json({
            message: "User not found",
            error: "Not found",
         });
      }
      
      if (name) {
         doctor.name = name;
         await doctor.save();
      }
     
      if (password) {
         const salt = await bcrypt.genSalt(10);
         const hash = bcrypt.hashSync(password, salt);
         doctor.password = hash;
         await doctor.save();
      }

      return res.status(201).json({
         message: "User updated",
         data: doctor,
      });
   } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({
         message: "Internal server error",
         error: err.message,
      });
   }
}

export async function getDoctorInfo(req: Request, res: Response) {
   try {
      const id = req.params.id;

      const doctor = await DoctorModel.findById(id);

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
   } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({
         message: "Internal server error",
         error: err.message,
      });
   }
}

export async function deleteDoctor(req: Request, res: Response) {
   try {
      if (!req.user) {
         return res.status(401).json({
            message: "Invalid token",
            error: "Unauthorized",
         });
      }

      const id = req.params.id;

      const doctor = await DoctorModel.findById(id);

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

      await doctor.deleteOne({ _id: doctor._id });

      return res.json({
         message: "User deleted successfully",
      });
   } catch (err: any) {
      console.error(err.message);
      return res.status(500).json({
         message: "Internal server error",
         error: err.message,
      });
   }
}
