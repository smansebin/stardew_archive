import { useState, useEffect } from "react";

// useLocalStorageState :  브라우저에서 같이 저장해서 새로고침해도 안 사라짐
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key); // 저장소에서 예전에서 저장해둔 값 꺼내오기
    return saved ? JSON.parse(saved) : initialValue; // 있으면 객체로 복원
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
