import { createContext, useContext, useState } from "react";


export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
} 

export const ThemeContextProvider = ({ children }) => {

  const [isDark, setIsDark] = useState(false);

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
