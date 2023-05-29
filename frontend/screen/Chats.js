import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';

//const App = () => {
function Chats({navigation}){
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);


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
    const url = 'http://127.0.0.1:5000/search'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content: message}),
      });
      if (response.ok) {
        const data = await response.json();
        // data로 채팅창에 답변 띄우는 과정 필요, 구현 부탁드립니다
      } else {
        const errorData = await response.json();
        // 오류 처리 부분입니다
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  return (
    <Text>Login Page</Text>
  );
};

export default Chats;
