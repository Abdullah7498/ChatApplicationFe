import React from "react";
import { Input, Avatar, Button, FloatButton } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

function USERS() {
  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Sent you the document.",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "2 days ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Sent you the document.",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "2 days ago",
    },
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "See you tomorrow!",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "Yesterday",
    },
    {
      id: 3,
      name: "Alice Johnson",
      lastMessage: "Sent you the document.",
      profilePic: "https://via.placeholder.com/40",
      timestamp: "2 days ago",
    },
  ];

  return (
    <div className="w-80 h-screen bg-gray-50 border-r border-gray-200  flex flex-col">
      <div className="p-4 h-[60px] text-center bg-primary">
        <h1 className="text-white text-xl font-bold">Mingle</h1>
      </div>

      <div className="p-4 bg-white border-b border-gray-200">
        <Input
          placeholder="Search chats..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex-1  overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center p-4 hover:bg-gray-100 border-b cursor-pointer"
          >
            <Avatar src={chat.profilePic} size="large" />

            <div className="ml-4 flex-1">
              <h2 className="font-semibold text-gray-800">{chat.name}</h2>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
            </div>

            <p className="text-xs text-gray-500">{chat.timestamp}</p>
          </div>
        ))}
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        className="bg-green-500 hover:bg-green-600"
        style={{ bottom: 24, right: 24 }}
        onClick={() => console.log("New chat clicked")}
      />
    </div>
  );
}

export default USERS;
