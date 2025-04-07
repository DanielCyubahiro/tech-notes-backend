import mongoose, {Schema} from 'mongoose';

const noteSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
);

export default mongoose.model('Note', noteSchema);