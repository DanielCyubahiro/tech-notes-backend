import express from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from '../controllers/notes.controller.js';

const router = express.Router();

router.route('/').get(getAllNotes).post(createNote);

router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

export default router;