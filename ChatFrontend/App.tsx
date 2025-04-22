import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';

interface Message {
  username: string;
  text: string;
  timestamp: string;
}

const socket = io('http://192.168.94.235:3000'); // your IP address

export default function App(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const handleLogin = async () => {
    try {
      await axios.post('http://192.168.94.235:3000/login', { username });
      setLoggedIn(true);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('sendMessage', { username, text: message });
    setMessage('');
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loggedIn ? (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Welcome to ChatApp</Text>
          <TextInput
            placeholder="Enter your name"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Join Chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.message}>
                <Text style={styles.messageText}>
                  <Text style={styles.user}>{item.username}</Text>: {item.text}
                </Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            )}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Type a message"
              value={message}
              onChangeText={setMessage}
              style={styles.inputMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.buttonSmall}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: '600',
    color: '#6200ee',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  chatContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 30,
  },
  message: {
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    elevation: 1,
  },
  messageText: { fontSize: 16 },
  user: { fontWeight: 'bold', color: '#6200ee' },
  timestamp: { fontSize: 12, color: 'gray', marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  inputMessage: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonSmall: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 8,
  },
});
