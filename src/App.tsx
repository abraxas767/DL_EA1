import React from 'react';
import MainContainer from './container/MainContainer';
import DocContainer from './container/DocContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* MAIN ML5 - APPLICATION */}
        <Route path="/ml5" element={<MainContainer />}/>
        {/* DOCUMENTATION */}
        <Route path="/doc" element={<DocContainer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
