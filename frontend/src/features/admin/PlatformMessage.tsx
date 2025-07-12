import { useState } from "react";
import { sendPlatformMessage } from "../../api/admin";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorAlert from "../../components/ErrorAlert";
import Loader from "../../components/Loader";

export default function PlatformMessage() {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
    asset: undefined as File | undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    sendPlatformMessage(form)
      .then(() => setSuccess("Message sent!"))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to send.")
      )
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h3>Platform Message</h3>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {success && (
        <div style={{ color: "#38a169", marginBottom: "1rem" }}>{success}</div>
      )}
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <Input
          type="email"
          placeholder="Recipient Email"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          style={{ minHeight: "80px", resize: "vertical", width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, asset: e.target.files?.[0] })}
          style={{ margin: "0.5rem 0" }}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Send"}
        </Button>
      </form>
    </div>
  );
}
