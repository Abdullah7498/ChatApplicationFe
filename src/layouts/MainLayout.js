import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/AuthSlice";
import SideBar from "./SideBar";
import { Avatar } from "antd";
import { API_URL, IMAGE_API_URL } from "../api/config";
import ChatContainer from "../pages/Chat/ChatContainer";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const { chatID, chat, conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <SideBar />

      <div className="w-80 h-full border-r border-gray-200">{children}</div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm py-4 h-[60px] px-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            {chatID?._id ? (
              <div className="text-gray-600 flex justify-center items-center gap-4 font-medium">
                {conversations?.participants?.find(
                  (convo) => convo._id != user?._id
                )?.avatar ? (
                  <Avatar
                    className="cursor-pointer"
                    src={
                      <img
                        src={`${IMAGE_API_URL}${
                          conversations?.participants?.find(
                            (convo) => convo._id != user?._id
                          )?.avatar
                        }`}
                        alt="avatar"
                      />
                    }
                  />
                ) : (
                  <Avatar
                    style={{ cursor: "pointer", verticalAlign: "middle" }}
                    size="large"
                  >
                    {conversations?.participants
                      ?.find((convo) => convo._id != user?._id)
                      ?.name?.slice(0, 1)}
                  </Avatar>
                )}
                {
                  conversations?.participants?.find(
                    (convo) => convo._id != user?._id
                  )?.name
                }
              </div>
            ) : (
              <p className="text-gray-500">Select a chat to start messaging</p>
            )}
          </div>
          <div className="relative" ref={containerRef}>
            {user?.avatar ? (
              <Avatar
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
                src={
                  <img src={`${IMAGE_API_URL}${user?.avatar}`} alt="avatar" />
                }
              />
            ) : (
              <Avatar
                style={{ cursor: "pointer", verticalAlign: "middle" }}
                onClick={() => setShowMenu(!showMenu)}
                size="large"
              >
                {user?.name.slice(0, 1)}
              </Avatar>
            )}
            {showMenu && (
              <ul className="p-2 z-10 rounded-md absolute right-0 top-12 bg-white shadow-md">
                <li
                  className="bg-primary  py-1 px-3 text-white rounded-md cursor-pointer"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {<ChatContainer chatID={chatID} user={user} chat={chat} />}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
