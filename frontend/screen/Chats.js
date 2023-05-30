import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';

function Chats({navigation}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('???');
    //inputRef.current.focus();
  }, []);

  const handleMessageSubmit = e => {
    e.preventDefault();
    console.log('ssss');
    const message = inputText.trim();
    if (message !== '') {
      const now = Math.round(Date.now() / 1000);

      setMessages([...messages, {key: now, text: message, isUser: true}]);
      inputRef.current.clear();

      // Show loading message
      const now2 = Math.round(Date.now() / 1000);

      setMessages([...messages, {key: now2, text: '생성중입니다...', isUser: false}]);

      sendMessageToChatGPT(message);
    }
  };

  const sendMessageToChatGPT = async message => {
    const url = 'http://10.0.2.2:5000/search/';

    console.log("Querying:", message);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"query": message}),
      });

      // Wait for response
      await response;

      if (response.ok) {
        const data = await response.json();
        const now = Math.round(Date.now() / 1000);

        // Append to messages list
        messages.push({key: now, text: data["hits"], isUser: false});
        setMessages([...messages]);
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
        {/* logout 버튼 */}
      </View>
      <View style={styles.body}>
        {messages.map((message, index) => (
            <View key={index}>
              {message.isUser ? (
                  <View key={message} style={styles.myMsg}>
                    <View style={styles.myMsgBox}>
                      {/*<Text style={styles.myText}> {message.text}</Text>*/}
                      <Text> {message.text}</Text>
                    </View>
                  </View>
              ) : (
                  <View key={message} style={styles.otherMsg}>
                    <View style={styles.otherMsgBox}>
                      {/*<Text style={styles.otherText}> {message.text}</Text>*/}
                      <Text> {message.text}</Text>
                    </View>
                  </View>
              )}
            </View>
        ))}
      </View>
      <View style={styles.inputView}>
        {/*Reset button*/}
        <Pressable
            style={styles.sendBtn}
            onPress={() => {
              setMessages([]);
            }}>
          <Text style={styles.sendText}>Reset</Text>
        </Pressable>
        <TextInput
            ref={inputRef}
            style={styles.TextInput}
            placeholder="Ask anything"
            placeholderTextColor="#003f5c"
            onChangeText={inputText => setInputText(inputText)}></TextInput>
        <Pressable style={styles.sendBtn} onPress={handleMessageSubmit}>
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
    width: '100%',
  },
  inputView: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  TextInput: {
    width: '70%',
    backgroundColor: 'white',
  },
  sendBtn: {
    backgroundColor: '#002554',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: 'white',
    fontWeight: '700',
  },
  myMsg: {
    flexDirection: 'row-reverse',
    marginBottom: 5,
    padding: 5,
  },
  otherMsg: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 5,
  },
  myMsgBox: {
    maxWidth: '70%',
    borderRadius: 5,
    backgroundColor: 'yellow',
    padding: 10,
  },
  otherMsgBox: {
    maxWidth: '70%',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default Chats;