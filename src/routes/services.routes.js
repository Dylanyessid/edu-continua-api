
import { createNewCourse } from '../controllers/services.controllers.js';
import { Router } from 'express';
import multer from "multer";

const router = Router()
const upload = multer({ dest: 'uploads/'})

router.post("/create", upload.fields([{name:"image", maxCount:1},{name:"exhibitor_photo", maxCount:1},{name:"supported_by", maxCount:1}]),createNewCourse);

export default router