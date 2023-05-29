import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

function Chats({navigation}){
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSubmit = () => {
    const message = inputText.trim();
    if (message !== '') {
      setMessages([...messages, {text: message, isUser: true}]);
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
        // TODO: display the response data in the chat
      } else {
        const errorData = await response.json();
        throw new Error(`Server responded with ${response.status}: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SKKU-GPT</Text>
        </View>
        <ScrollView style={styles.chatContainer}>
          {messages.map((message, index) => (
              <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    {alignSelf: message.isUser ? 'flex-end' : 'flex-start'}
                  ]}
              >
                <Text style={message.isUser ? styles.userMessage : styles.botMessage}>
                  {message.text}
                </Text>
              </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              placeholder="Ask anything"
              onSubmitEditing={handleMessageSubmit}
          />
          <Button title="Send" onPress={handleMessageSubmit}/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#072A60',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#B6BFD0',
    padding: 20,
  },
  messageContainer: {
    maxWidth: '70%',
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: 10,
    borderRadius: 8,
  },
  botMessage: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: '#072A60',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 4,
  },
});

export default Chats;
