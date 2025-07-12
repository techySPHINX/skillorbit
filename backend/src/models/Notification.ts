import mongoose, { Document, Schema } from 'mongoose'

export interface INotification extends Document {
  user: mongoose.Types.ObjectId
  type: string
  message: string
  isRead: boolean
  createdAt: Date
  assetUrl?: string
  assetPublicId?: string
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    assetUrl: { type: String }, 
    assetPublicId: { type: String }, 
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

NotificationSchema.index({ user: 1 })

export default mongoose.model<INotification>('Notification', NotificationSchema)
