
import React, { useState } from 'react';
import { sendPlatformMessage } from '../api/admin';

const MessageForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPlatformMessage({ to, subject, message });
    setTo('');
    setSubject('');
    setMessage('');
    alert('Message sent!');
  };

  return (
    <div className="card">
      <h2>Send Platform Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input type="email" id="to" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
