import React, { useEffect, useState } from "react";
import { Input, Avatar, Button, FloatButton } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import AddContactModal from "../pages/Chat/AddContactModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversationById,
  getConversationMessagesById,
  getUerContacts,
  startConversation,
} from "../store/slices/ChatSlice";
import { IMAGE_API_URL } from "../api/config";

function USERS() {
  const [openModel, setOpenModal] = useState(false);
  const { userContacts, chat, conversations } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(chat, conversations);

  useEffect(() => {
    dispatch(getUerContacts(user?._id));
  }, []);

  return (
    <div className="w-80 h-screen bg-gray-50 border-r border-gray-200  flex flex-col">
      <div className="p-4 h-[60px] text-center bg-primary">
        <h1 className="text-white text-xl font-bold">Mingle</h1>
      </div>

      <div className="p-4 bg-white border-b flex justify-center items-center gap-2 border-gray-200">
        <Input
          placeholder="Search chats..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="w-full bg-gray-100 border border-gray-300 rounded-lg h-8 placeholder:text-gray-500 hover:border-primary focus:border-primary focus:shadow-primary/20"
        />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          className="bg-primary-500 hover:bg-primary-600 rounded-full"
          onClick={() => setOpenModal(!openModel)}
        />
      </div>

      <div className="flex-1  overflow-y-auto">
        {userContacts ? (
          userContacts?.map((chat, index) => (
            <div
              onClick={() => {
                dispatch(startConversation([chat, user])).then((response) => {
                  dispatch(getConversationById(response?.payload?._id)).then(
                    (response) => {
                      dispatch(
                        getConversationMessagesById(response?.payload?._id)
                      );
                    }
                  );
                });
              }}
              key={index}
              className="flex items-center p-4 hover:bg-gray-100 border-b cursor-pointer"
            >
              <Avatar src={IMAGE_API_URL + chat.avatar} size="large" />

              <div className="ml-4 flex-1">
                <h2 className="font-semibold text-gray-800">
                  {user?.email === chat?.email ? "me" : chat.name}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No contacts found</div>
        )}
      </div>

      <AddContactModal showModal={openModel} setOpenModal={setOpenModal} />
    </div>
  );
}

export default USERS;
