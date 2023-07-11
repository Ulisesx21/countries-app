import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "./App.css";

function App() {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path="/countries-app" element={<Home />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </main>
  );
}

export default App;
