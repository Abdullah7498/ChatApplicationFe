import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/AuthSlice";
import SideBar from "./SideBar";

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const { chatID } = useSelector((state) => state.chat);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <SideBar />

      <div className="w-80 h-full border-r border-gray-200">{children}</div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm py-4 px-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            {chatID ? (
              <div className="text-gray-600 font-medium">
                Chat with User #{chatID}
              </div>
            ) : (
              <p className="text-gray-500">Select a chat to start messaging</p>
            )}
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!chatID && (
            <div className="h-full flex items-center justify-center text-gray-400 text-lg">
              Select a chat or start a new conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
