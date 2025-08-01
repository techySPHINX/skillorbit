
import mongoose, { Document, Schema } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string; // URL or identifier for the badge icon
  criteria: string; // Human-readable criteria for earning the badge
  pointsAwarded: number; // Points awarded when this badge is earned
}

const BadgeSchema = new Schema<IBadge>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  criteria: { type: String, required: true },
  pointsAwarded: { type: Number, required: true, default: 0 },
});

export default mongoose.model<IBadge>('Badge', BadgeSchema);
