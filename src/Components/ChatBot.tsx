import React from 'react';
import ChatBotContainer from './ChatBotContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBot: React.FC = () =>  {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column bg-light">
    <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
     <ChatBotContainer /> 
    </main>
  </div>
  )
}

export default ChatBot