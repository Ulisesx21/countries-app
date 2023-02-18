import { createContext, useState } from "react"

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

  const [themeState, setThemeState] = useState(false)

  return (
    <ThemeContext.Provider value={{ themeState, setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}
