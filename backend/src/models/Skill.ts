import mongoose, { Document, Schema } from 'mongoose'

export interface ISkill extends Document {
  name: string
  category?: string
  description?: string
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  image?: string
  imagePublicId?: string
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true, lowercase: true },
    description: { type: String, maxlength: 500 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String }, 
    imagePublicId: { type: String }, 
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)


export default mongoose.model<ISkill>('Skill', SkillSchema)
