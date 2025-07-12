import mongoose, { Document, Schema } from 'mongoose'

export interface IFeedback extends Document {
  swap: mongoose.Types.ObjectId
  fromUser: mongoose.Types.ObjectId
  toUser: mongoose.Types.ObjectId
  rating: number
  comment?: string
  createdAt: Date
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    swap: { type: Schema.Types.ObjectId, ref: 'Swap', required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema)
