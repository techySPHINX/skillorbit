import mongoose, { Document, Schema } from 'mongoose'

export interface ISkill extends Document {
  name: string
  category?: string
  description?: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model<ISkill>('Skill', SkillSchema)
