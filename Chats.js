import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const message = inputText.trim();
    if (message !== '') {
      setMessages([...messages, { text: message, isUser: true }]);
      setInputText('');
      sendMessageToChatGPT(message);
    }
  };

  const sendMessageToChatGPT = async (message) => {
    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}
    >

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          backgroundColor: '#072A60',
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        SKKU-GPT
      </div>


      <div
        style={{
          flex: '8',
          backgroundColor: '#B6BFD0',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                backgroundColor: message.isUser ? '#FFFFFF' : '#000000',
                color: message.isUser ? '#000000' : '#FFFFFF',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

 
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '50px',

          backgroundColor: '#FFFFFF',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          ref={inputRef}
          style={{
            flex: '1',
            border: 'none',
	height: '50px',
            borderRadius: '0',
          }}
          placeholder="Ask anything"
          onKeyPress={handleKeyPress}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#072A60',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '0',
	width: '100px',
            height: '52px',
          }}
          onClick={handleMessageSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
