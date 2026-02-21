import mongoose from 'mongoose'

const { Schema } = mongoose

const messageSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ['user', 'assistant', 'system'],
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
)

const chatHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    messages: {
      type: [messageSchema],
      required: true,
    },
    response: {
      type: messageSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('ChatHistory', chatHistorySchema)

