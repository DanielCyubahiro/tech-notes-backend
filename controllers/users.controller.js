import UserModel from '../models/user.model.js';
import ApiResponse from '../utils/response.util.js';
import ApiError from '../utils/error.util.js';
import {hashPassword} from '../services/auth.service.js';
import NoteModel from '../models/note.model.js';

/**
 * @param {*} req
 * @param {*} res
 * @param {NextFunction|Response<*, Record<string, *>>} next
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().select('-password').lean();

    return res.json(new ApiResponse(
        200,
        users,
        users.length ? 'Users retrieved successfully' : 'No users found.',
    ));
  } catch (error) {
    next(error);
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {NextFunction|Response<*, Record<string, *>>} next
 * @desc Get a user by id
 * @route GET /users/:id
 * @access Private
 */
const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params?.id).
        select('-password').
        lean();

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.json(new ApiResponse(
        200,
        user,
        'User retrieved successfully',
    ));
  } catch (error) {
    next(error);
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {NextFunction|Response<*, Record<string, *>>} next
 * @desc Create a new user
 * @route POST /users
 * @access Private
 */
const createUser = async (req, res, next) => {
  try {
    const {username, password, roles} = req.body;

    // Check for existing user
    const existingUser = await UserModel.findOne({username}).lean();
    if (existingUser) {
      return next(new ApiError(409, 'Username already registered'));
    }

    // Create new user
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      roles,
    });

    // Return response (avoid including password hash)
    const {password: _, ...userData} = newUser.toObject();
    return res.json(new ApiResponse(
        201,
        process.env.NODE_ENV === 'development' ? newUser : userData,
        'User created successfully',
    ));
  } catch (error) {
    next(error);
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {NextFunction|Response<*, Record<string, *>>} next
 * @desc Update a user
 * @route PUT /users/:id
 * @access Private
 */
const updateUser = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.params?.id).lean();

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (req?.body?.password) {
      const hashedPassword = await hashPassword(req?.body?.password);
      user = await UserModel.findByIdAndUpdate(
          req.params?.id,
          {...req.body, password: hashedPassword},
          {
            new: true,
          }).lean();
    } else {
      user = await UserModel.findByIdAndUpdate(
          req.params?.id,
          req.body,
          {
            new: true,
          }).lean();
    }

    return res.json(new ApiResponse(
        200,
        user,
        'User updated successfully',
    ));
  } catch (error) {
    next(error);
  }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {NextFunction|Response<*, Record<string, *>>} next
 * @desc Delete a user
 * @route DELETE /users/:id
 * @access Private
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params?.id).lean();

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    // Check for foreign id constraints
    const note = await NoteModel.findOne({userId: req.params?.id}).lean();
    if (note) {
      return next(new ApiError(400, 'User has at least one assigned note'));
    }

    await UserModel.findByIdAndDelete(req.params?.id);

    return res.json(new ApiResponse(
        204,
        null,
        'User deleted successfully',
    ));
  } catch (error) {
    next(error);
  }
};

export {getAllUsers, getUser, createUser, updateUser, deleteUser};