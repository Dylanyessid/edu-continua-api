import { Router } from "express";
import adminRouter from "./admin.routes.js";
import servicesRouter from "./services.routes.js";
const router = Router();

router.use("/admin", adminRouter);
router.use("/services", servicesRouter);

export default router;
