import mongoose, {Schema} from 'mongoose';
import mongoose_sequence from 'mongoose-sequence';

const AutoIncrement = mongoose_sequence(mongoose);

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
    },
);

noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
});

export default mongoose.model('Note', noteSchema);