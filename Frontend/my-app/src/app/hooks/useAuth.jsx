const useAuth = () => {
  // 비밀번호를 SHA-256으로 해싱하는 비동기 함수
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashedPassword;
  };

  return { hashPassword };
};

export default useAuth;
