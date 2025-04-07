import Note from '../models/note.model.js';
import ApiResponse from '../utils/response.util.js';
import ApiError from '../utils/error.util.js';

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(new ApiResponse(
        200,
        notes,
        'Notes retrieved successfully',
    ));
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return next(new ApiError(404, 'Note not found'));
    return res.status(200).json(new ApiResponse(
        200,
        note,
        'Note retrieved successfully',
    ));
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create(req.body);
    return res.status(201).json(new ApiResponse(
        201,
        newNote,
        'Note created successfully'));
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return next(new ApiError(404, 'Note not found'));
    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });

    return res.status(200).json(new ApiResponse(
        200,
        note,
        'Note updated successfully',
    ));
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  let note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return next(new ApiError(404, 'Note not found'));
  return res.status(200).json(new ApiResponse(
      200,
      note,
      'Note deleted successfully',
  ));
};
export {getAllNotes, getNote, createNote, updateNote, deleteNote};