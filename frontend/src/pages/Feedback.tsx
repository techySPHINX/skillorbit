import FeedbackList from "../features/feedback/FeedbackList";
import { useParams } from "react-router-dom";

export default function FeedbackPage() {
  const { userId } = useParams();
  return <FeedbackList userId={userId!} />;
}
