import React from 'react';
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Lobby from './pages/Lobby';
import Chatroom from './pages/Chatroom';

function App() {
  return (
    <>
    <Routers>
      <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
    </Routers>
  </>
  );
}

export default App;
