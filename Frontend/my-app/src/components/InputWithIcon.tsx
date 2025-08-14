// InputWithIcon.tsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface InputWithIconProps {
  id: string;
  label: string;
  icon: IconDefinition;
  placeholder: string;
  type?: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  id,
  label,
  icon,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {/* 👈 부모 div에 relative 클래스가 있어야 합니다. */}
      <div className="mt-1 relative rounded-md shadow-sm">
        {/* 👈 아이콘 div에 absolute 클래스가 있어야 합니다. */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
