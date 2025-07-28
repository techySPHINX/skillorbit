import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  passwordHash: string
  profilePhoto?: string
  profilePhotoPublicId?: string
  skillsOffered: mongoose.Types.ObjectId[]
  skillsWanted: mongoose.Types.ObjectId[]
  location?: string
  availability?: string
  isPrivate: boolean
  isBanned: boolean
  roles: string[]
  rating: number
  feedbacks: mongoose.Types.ObjectId[]
  fcmTokens: string[]
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
    passwordHash: { type: String, required: true },
    profilePhoto: { type: String },
    profilePhotoPublicId: { type: String },
    skillsOffered: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    skillsWanted: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    location: { type: String },
    availability: { type: String },
    isPrivate: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    roles: { type: [String], default: ['user'] },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    fcmTokens: { type: [String], default: [] },
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', UserSchema)
