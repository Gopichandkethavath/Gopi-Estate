import { createlist } from "../controllers/list.controller.js";
import express from 'express';
 const router=express.Router();
router.post('/createlist',createlist);
export default router;