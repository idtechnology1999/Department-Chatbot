
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatBot from './Components/ChatBot';
import Home from "./Components/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ChatBot" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
