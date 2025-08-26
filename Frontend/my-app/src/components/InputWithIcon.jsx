"use client";

import React from "react";
// FontAwesomeIcon 컴포넌트와 아이콘 정의를 가져옵니다.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// InputWithIcon 컴포넌트
const InputWithIcon = ({
  id,
  label,
  icon,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* FontAwesomeIcon 컴포넌트를 사용하여 아이콘 렌더링 */}
          <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputWithIcon;
