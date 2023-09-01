import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { get, set } from "../utils/sessionStorage";

export const ThemeContextProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(get("countriesAppTheme") || true);

  useEffect(() => {
    set("countriesAppTheme", isDark);
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
