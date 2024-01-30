import { Router } from 'express';
import {
  createReport,
  getMyReports,
  getOneReport,
  updateReport,
  removeReport,
} from '../controller/report';
import { auth } from "../auth/authe";

const router = Router();

router.post('/', auth, createReport);
router.get('/mine', auth, getMyReports);
router.get('/one/:reportId', auth, getOneReport);
router.put('/:reportId', auth, updateReport);
router.delete('/:reportId', auth, removeReport);
//router.get('/dashboard', async(req, res, next) => {
  //const doctorId = (req.session as any).doctorId
 //if (!doctorId) {
//   res.redirect("doctors/login")
//  }
export default router;
