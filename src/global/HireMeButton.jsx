// components/HireMeButton.jsx
import { useState } from "react";
import HireMeModal from "./HireMeModal";

const HireMeButton = ({ className, variant = "primary", children }) => {
  const [showModal, setShowModal] = useState(false);

  const buttonStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${buttonStyles[variant]} ${className}`}
      >
        {children || "Hire Me"}
      </button>

      <HireMeModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default HireMeButton;