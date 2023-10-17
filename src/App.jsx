import React from 'react';
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Lobby from './components/Lobby';
import Chatroom from './components/Chatroom';

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
