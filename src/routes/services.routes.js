
import { createNewCourse } from '../controllers/services.controllers.js';
import { Router } from 'express';
import multer from "multer";

const router = Router()
const upload = multer({ dest: 'uploads/'})

router.post("/create", upload.fields([{name:"courseImage"}]),createNewCourse);

export default router