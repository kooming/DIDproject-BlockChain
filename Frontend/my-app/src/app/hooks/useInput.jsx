import { useState, useCallback } from "react";

function useInput(initialValue = "", onClickCallback) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    if (typeof onClickCallback === "function") {
      onClickCallback(value); // 현재 입력값을 콜백으로 전달
    }
  }, [onClickCallback, value]);

  return {
    value,
    onChange,
    onClick,
    reset: () => setValue(initialValue),
  };
}

export default useInput;
