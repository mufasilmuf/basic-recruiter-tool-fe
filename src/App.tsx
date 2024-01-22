import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";
import AddCandidates from "./modules/add-candidate";
import Home from "./modules/home";

const App = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddCandidates />} />
    </Routes>
  );
};

export default App;
