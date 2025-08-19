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
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
          <FontAwesomeIcon icon={icon} className="h-5 w-5 p text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          className="block pl-5 w-70"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
