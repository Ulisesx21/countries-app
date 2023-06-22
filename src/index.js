import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/themeContext";
import { CountriesContextProvider } from "./context/countriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CountriesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CountriesContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
