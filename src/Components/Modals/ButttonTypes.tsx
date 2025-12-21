import React from "react";


interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string; 
}

export const ButtonTypes: React.FC<ButtonProps> = ({ label, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-white transition cursor-pointer 
        ${color ?? "bg-primary hover:bg-gray-600"}`}
    >
      {label}
    </button>
  );
};

