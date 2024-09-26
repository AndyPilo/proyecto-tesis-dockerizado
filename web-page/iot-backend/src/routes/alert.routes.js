import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { auhtRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();
router.get("/alerts", auhtRequired, getAlerts);
router.get("/alerts/:id", auhtRequired, getAlert);
router.post("/alerts", auhtRequired, createAlert);
router.delete("/alerts/:id", auhtRequired, deleteAlert);
router.gut("/alerts/:id", auhtRequired, updateAlert);

export default router;
