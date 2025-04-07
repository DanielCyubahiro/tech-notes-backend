import Note from '../models/note.model.js';
import ApiResponse from '../utils/response.util.js';

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

export {getAllNotes};