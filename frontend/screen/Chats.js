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
    const apiKey = ''; // OUR_API_KEY
    const prompt = ''; // OUR_MESSAGE;

    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${apiKey}`
    };

    const data = {
      prompt : prompt,
      max_tokens: 900
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      const completion = data.choices[0].text;
      console.log(completion);
    })
    .catch(error => {
      console.error('Error:', error); // 수정 요
    })
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
