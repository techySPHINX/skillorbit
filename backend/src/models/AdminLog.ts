import mongoose, { Document, Schema } from 'mongoose'

export interface IAdminLog extends Document {
  action: string
  performedBy: mongoose.Types.ObjectId
  targetUser?: mongoose.Types.ObjectId
  details?: string
  createdAt: Date
}

const AdminLogSchema = new Schema<IAdminLog>(
  {
    action: { type: String, required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetUser: { type: Schema.Types.ObjectId, ref: 'User' },
    details: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model<IAdminLog>('AdminLog', AdminLogSchema)
