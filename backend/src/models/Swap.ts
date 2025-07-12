import mongoose, { Document, Schema } from 'mongoose'

export interface ISwap extends Document {
  requester: mongoose.Types.ObjectId
  responder: mongoose.Types.ObjectId
  skillOffered: mongoose.Types.ObjectId
  skillWanted: mongoose.Types.ObjectId
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  messages: {
    sender: mongoose.Types.ObjectId
    content: string
    timestamp: Date
  }[]
  scheduledTime?: Date
  feedback?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  image?: string
  imagePublicId?: string
}

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false } 
)

const SwapSchema = new Schema<ISwap>(
  {
    requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    responder: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skillOffered: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
    skillWanted: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
    messages: [MessageSchema],
    scheduledTime: { type: Date },
    feedback: { type: Schema.Types.ObjectId, ref: 'Feedback' },
    image: { type: String }, 
    imagePublicId: { type: String }, 
  },
  { timestamps: true }
)

export default mongoose.model<ISwap>('Swap', SwapSchema)
