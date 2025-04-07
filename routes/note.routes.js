import express from 'express';
const router = express.Router();
import {getAllNotes} from '../controllers/notes.controller.js';

router.get('/', getAllNotes);

export default router;