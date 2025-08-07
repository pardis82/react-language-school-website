import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // وقتی لاگین موفق انجام می‌شود، این تابع را صدا می‌زنیم
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // برای ذخیره بعد از refresh
  };

  // برای لاگ‌اوت
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // وقتی اپ دوباره لود شد، user را از localStorage بخوانیم
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);