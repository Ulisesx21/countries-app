import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { get, set } from "../utils/sessionStorage";

export const ThemeContextProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(get("countries-app-theme") || false);

  useEffect(() => {
    set("countries-app-theme", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
