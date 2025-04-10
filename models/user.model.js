import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      roles: [
        {
          type: String,
          default: 'Employee',
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
);

export default mongoose.model('User', userSchema);