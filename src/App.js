import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Detalles from "./components/Detalles";
import "./App.css"


function App() {

  let [mode, setMode] = useState()

  return (
    <div className="App">
      <Header mode={(e)=> {
        setMode(e)
        }}/>
      <div>
        <Routes>
          <Route path="/countries-app" element={<Main mode={mode}/>} />
          <Route path="/detalle" element={<Detalles mode={mode}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
