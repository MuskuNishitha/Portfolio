import React from "react";

const NavItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 cursor-pointer ${
        active ? "text-red-500" : "text-gray-600"
      } hover:text-red-500`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </div>
  );
};

export default NavItem;