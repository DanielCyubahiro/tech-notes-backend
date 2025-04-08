import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = async (password) => await bcrypt.hash(password, 10);
const comparePassword = async (
    password, hashedPassword) => await bcrypt.compare(password, hashedPassword);
const generateAccessToken = (user) => jwt.sign(
    {
      'UserInfo': {
        id: user.id,
        username: user.username,
        roles: Object.values(user.roles),
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    });
const generateRefreshToken = (user) => jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

export {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
};