import {Alert, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

this.showErrorMsg = false;

function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errorRef = React.createRef();

    const skkuLoginSubmit = () => {
        const skkuUrl = "http://10.0.2.2:5000/login/";
        const headers = {
            'Content-Type': 'application/json'
      };
    const data = {
        "username": username,
        "password": password
    };
    fetch(skkuUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
        if (responseJson["success"] === true)
            navigation.navigate('Chats');
        else {
            Alert.alert("로그인 실패", "아이디와 비밀번호를 확인하세요", [{text: "확인"}], {cancelable: false});
        }
    })
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/logo.jpg')} />
      <StatusBar style="auto" />
      <Text style={styles.title}> SKKU-GPT </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={username => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      
      {/* onPress={() => navigation.navigate('Chats')} */}
      <Pressable
        style={styles.loginBtn}
        onPress={skkuLoginSubmit}  
    >
        <Text style={styles.loginText}>LOGIN</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: -40,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#002554',
  },
  loginText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default Login;
