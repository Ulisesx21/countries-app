import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Detalles from "./pages/Detalles";
import "./App.css";

function App() {
  return (
    <main className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/countries-app" element={<Home />} />
          <Route path="/detalle" element={<Detalles />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
