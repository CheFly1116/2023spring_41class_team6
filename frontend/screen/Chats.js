import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

function Chats({navigation}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const handleMessageSubmit = e => {
    e.preventDefault();
    const message = inputText.trim();
    if (message !== '') {
      setMessages([...messages, {text: message, isUser: true}]);
      setInputText('');
      sendMessageToChatGPT(message);
    }
  };

  const sendMessageToChatGPT = async message => {
    const url = 'http://127.0.0.1:5000/search';
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SKKU-GPT</Text>
      </View>
      <View style={styles.body}>
        <Text>message</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Ask anything."
          placeholderTextColor="#003f5c"></TextInput>
        <Pressable style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#002554',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  body: {
    flex: 1,
    backgroundColor: '#B6BFD0',
    width:'100%',
  },
  inputView: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  TextInput: {
    width: '80%',
  },
  sendBtn: {
    backgroundColor: '#002554',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default Chats;
