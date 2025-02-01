import React, { useEffect, useState } from "react";
import { Avatar, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useDebounce from "../../hooks/useDebouncs";
import { useDispatch, useSelector } from "react-redux";
import {
  AddContact,
  fetchUsers,
  getUerContacts,
} from "../../store/slices/ChatSlice";
import { IMAGE_API_URL } from "../../api/config";
import CustomConfirmationModal from "../../shared/CustomConfirmationModal";

const AddContactModal = ({ showModal, setOpenModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedUser, setSlectedUser] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const handleCancel = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(fetchUsers({ email: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleConfirm = async () => {
    if (selectedUser) {
      await dispatch(
        AddContact({ userId: user._id, contactId: selectedUser._id })
      ).then(() => {
        dispatch(getUerContacts(user._id));
        setConfirmation(false);
        setOpenModal(false);
      });
    }
  };

  const handleCancelConfirmation = () => {
    setConfirmation(false);
  };
  return (
    <>
      <Modal
        title="Add Contact"
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        closable={true}
      >
        <div className="p-4 bg-white">
          <Input
            placeholder="Search chats..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg h-8 placeholder:text-gray-500 hover:border-primary focus:border-primary focus:shadow-primary/20"
          />
        </div>
        <div className="flex-1  overflow-y-auto">
          {users.map((chat, index) => (
            <div
              onClick={() => {
                setSlectedUser(chat);
                setConfirmation(true);
              }}
              key={index}
              className="flex items-center p-4 hover:bg-gray-100 border-b cursor-pointer"
            >
              <Avatar src={IMAGE_API_URL + chat.avatar} size="large" />

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
      </Modal>
      <CustomConfirmationModal
        visible={confirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirmation}
        message={`Add ${selectedUser?.name} to contacts`}
      />
    </>
  );
};

export default AddContactModal;
