import { useEffect, useState } from "react";
import "./Messages.css";
import adminApi from "../../../api/adminApi";
import { motion, AnimatePresence } from "framer-motion";

const Messages = () => {
  const [messages, setMessages] = useState([]);   //it holds all messages coming from backend
  const [activeMessage, setActiveMessage] = useState(null);   //message already opened in modal
  const [loading, setLoading] = useState(true);      //loading state while fetching messages prevets ui flash before data arrives

  // 1️⃣ Fetch all messages from backend
  const fetchMessages = async () => {
    try {
      const { data } = await adminApi.get("/messages");
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Delete a message
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;

    try {
      await adminApi.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      setActiveMessage(null);
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  // 3️⃣ Mark message as read (UI only)
  const openMessage = (message) => {
    setActiveMessage(message);

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === message._id ? { ...msg, isRead: true } : msg
      )
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <div className="messages-loading">Loading messages…</div>;
  }

  return (
    <div className="messages-container">
      <h1 className="messages-title">Inbox</h1>

      {messages.length === 0 && (
        <p className="empty-state">No messages yet.</p>
      )}

      <div className="messages-list">
        {messages.map((msg) => (
          <motion.div
            key={msg._id}
            className={`message-card ${msg.isRead ? "read" : "unread"}`}
            onClick={() => openMessage(msg)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="message-header">
              <span className="message-name">{msg.name}</span>
              <span className="message-time">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="message-preview">
              {msg.message.slice(0, 60)}…
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="message-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="message-modal"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <h2>{activeMessage.name}</h2>
              <p className="modal-email">{activeMessage.email}</p>
              <p className="modal-message">{activeMessage.message}</p>

              <div className="modal-actions">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(activeMessage._id)}
                >
                  Delete
                </button>
                <button
                  className="btn-close"
                  onClick={() => setActiveMessage(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
