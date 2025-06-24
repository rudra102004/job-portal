import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";

// Dummy users for now
const dummyConnections = [
  { id: 1, email: "anjali@example.com" },
  { id: 2, email: "ravi@example.com" },
];

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", currentUser.email),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (msg) =>
            (msg.from === currentUser.email && msg.to === selectedUser.email) ||
            (msg.from === selectedUser.email && msg.to === currentUser.email)
        );
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  const sendMessage = async () => {
    if (!text.trim() || !selectedUser || !currentUser) return;

    await addDoc(collection(db, "messages"), {
      from: currentUser.email,
      to: selectedUser.email,
      text: text.trim(),
      timestamp: serverTimestamp(),
      participants: [currentUser.email, selectedUser.email],
    });

    setText("");
  };

  return (
    <div className="flex h-[90vh] bg-gray-100 shadow-inner">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r overflow-y-auto">
  <h2 className="text-lg font-semibold p-4 border-b">Messages</h2>
  {dummyConnections.map((user) => {
    // Find the last message exchanged with this user
    const lastMsg = messages
      .filter(
        (msg) =>
          (msg.from === user.email && msg.to === currentUser.email) ||
          (msg.to === user.email && msg.from === currentUser.email)
      )
      .slice(-1)[0]; // get the last one

    return (
      <div
        key={user.id}
        onClick={() => setSelectedUser(user)}
        className={`flex items-start gap-3 px-4 py-3 cursor-pointer text-sm transition border-b ${
          selectedUser?.id === user.id
            ? "bg-blue-100 font-medium"
            : "hover:bg-gray-50"
        }`}
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {user.email.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex flex-col w-full">
          <span className="font-semibold">{user.email}</span>
          <span className="text-xs text-gray-500 truncate max-w-[160px]">
            {lastMsg?.text || "No messages yet"}
          </span>
        </div>
      </div>
    );
  })}
</aside>

      {/* Chat window */}
      <main className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="border-b px-6 py-4 font-semibold text-gray-800 shadow-sm">
              Chat with {selectedUser.email}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end ${
                    msg.from === currentUser.email
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {/* Avatar for received messages */}
                  {msg.from !== currentUser.email && (
                    <div className="w-7 h-7 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                      {selectedUser.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 text-sm max-w-xs shadow ${
                      msg.from === currentUser.email
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                    <div className="text-xs mt-1 text-right opacity-60">
                      {msg.timestamp?.toDate().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t px-6 py-3 bg-white flex items-center">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a user to start chatting.
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
