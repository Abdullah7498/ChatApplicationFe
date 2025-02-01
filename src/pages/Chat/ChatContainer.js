import { SendHorizontal, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { getConversationMessagesById } from "../../store/slices/ChatSlice";

function ChatContainer({ chatID, user, chat }) {
  const [newMessage, setNewMessage] = useState("");
  // const SOCKET_SERVER_URL = "http://localhost:8000";
  const SOCKET_SERVER_URL = "https://minglechat-production.up.railway.app";
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    setSocket(newSocket);
    newSocket.on("receiveMessage", (message) => {
      dispatch(getConversationMessagesById(chatID?._id));
    });
    return () => newSocket.disconnect();
  }, [dispatch, SOCKET_SERVER_URL, chatID]);

  useEffect(() => {
    if (socket && chatID?._id) {
      socket.emit("joinConversation", { conversationId: chatID._id });
    }
  }, [chatID, socket]);

  const handleSend = () => {
    if (socket && newMessage) {
      socket.emit("sendMessage", {
        conversationId: chatID._id,
        sender: user,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200 shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        {!chatID?._id ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <MessageSquare className="w-12 h-12 text-primary-500" />
            <p className="text-gray-500 text-lg font-medium">
              Select a chat or start a new conversation
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex  z-0 ${
                  msg?.sender === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-md p-4 rounded-2xl shadow-sm ${
                    msg?.sender === user?._id
                      ? "bg-primary-500 text-white"
                      : "bg-white text-gray-800 shadow-md"
                  }`}
                >
                  <p className="text-sm leading-5">{msg.text}</p>
                  <div
                    className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                      msg?.sender === user?._id
                        ? "bg-primary-500 -right-1"
                        : "bg-white -left-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {chatID?._id && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="p-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
