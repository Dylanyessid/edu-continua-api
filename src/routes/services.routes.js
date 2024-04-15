import { createNewFormationService, deleteFormationService, getFormationServicesByPagination,updateFormationService } from "../controllers/services.controllers.js";
import { Router } from "express";
import multer from "multer";
import { validateToken } from "../helpers/jwt.js";


const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/create", validateToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "exhibitor_photo", maxCount: 1 },
    { name: "supported_by_photo", maxCount: 1 },
  ]),
  createNewFormationService
);
router.get("/:type/:skip/:taking",getFormationServicesByPagination)
router.patch("/:type/:id", validateToken,  upload.fields([
  { name: "image", maxCount: 1 },
  { name: "exhibitor_photo", maxCount: 1 },
  { name: "supported_by_photo", maxCount: 1 },
]),updateFormationService)

router.delete("/:type/:id", deleteFormationService)
export default router;
