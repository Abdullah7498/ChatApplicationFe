import React from "react";
import { Tooltip } from "antd";
import { MessageCircleHeart, Settings, UserRoundPen } from "lucide-react";

function SideBar() {
  return (
    <div className=" bg-primary flex flex-col p-4 justify-between items-center w-[50px] h-screen">
      <div>
        <Tooltip title="chat" placement="left">
          <MessageCircleHeart className="text-white cursor-pointer"  size={25} />
        </Tooltip>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <Tooltip title="settings" placement="left">
          <Settings className="text-white cursor-pointer" size={25} />
        </Tooltip>
        <Tooltip title="profile" placement="left">
          <UserRoundPen className="text-white cursor-pointer" size={25} />
        </Tooltip>
      </div>
    </div>
  );
}

export default SideBar;
