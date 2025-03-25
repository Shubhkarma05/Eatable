import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { generateChatResponse } from '../api/openaiApi';

const ChatbotScreen = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      role: 'assistant', 
      content: "Hi! I'm EatMate, your cooking and nutrition assistant. How can I help you today? You can ask me about recipes, cooking techniques, ingredient substitutions, or nutrition advice." 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    headerSubtitle: {
      fontSize: 14,
      color: theme.muted,
      marginTop: 4,
    },
    messageList: {
      flex: 1,
      padding: 16,
    },
    messageContainer: {
      maxWidth: '80%',
      marginBottom: 16,
      borderRadius: 16,
      padding: 12,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme.primary,
      borderBottomRightRadius: 4,
    },
    assistantMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.secondary,
      borderBottomLeftRadius: 4,
    },
    userMessageText: {
      color: '#FFFFFF',
    },
    assistantMessageText: {
      color: theme.text,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.background,
    },
    input: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 10,
      color: theme.text,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor: theme.primary,
      borderRadius: 24,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainer: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
      padding: 12,
      marginBottom: 16,
    },
    loadingText: {
      color: theme.text,
      marginLeft: 8,
    },
    suggestionContainer: {
      marginBottom: 16,
    },
    suggestionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.muted,
      marginBottom: 8,
    },
    suggestionChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    suggestionChip: {
      backgroundColor: theme.secondary,
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    suggestionChipText: {
      color: theme.primary,
    },
  });

  const suggestions = [
    "How do I make pasta sauce from scratch?",
    "What can I substitute for eggs in baking?",
    "How many calories are in an avocado?",
    "What's a quick dinner with chicken?",
    "How do I cook quinoa?",
    "What are some healthy breakfast ideas?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Format messages for OpenAI API
      const formattedMessages = messages
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      formattedMessages.push({ role: 'user', content: input.trim() });
      
      const response = await generateChatResponse(formattedMessages);
      
      const assistantMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'm sorry, I couldn't process your request. Please try again." 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ask EatMate</Text>
        <Text style={styles.headerSubtitle}>Your AI cooking assistant</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        style={styles.messageList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View 
            style={[
              styles.messageContainer,
              item.role === 'user' ? styles.userMessage : styles.assistantMessage
            ]}
          >
            <Text 
              style={item.role === 'user' ? styles.userMessageText : styles.assistantMessageText}
            >
              {item.content}
            </Text>
          </View>
        )}
        ListHeaderComponent={
          messages.length === 1 ? (
            <View style={styles.suggestionContainer}>
              <Text style={styles.suggestionTitle}>Try asking:</Text>
              <View style={styles.suggestionChips}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.suggestionChip}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionChipText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null
        }
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.primary} />
              <Text style={styles.loadingText}>Thinking...</Text>
            </View>
          ) : null
        }
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything about food..."
            placeholderTextColor={theme.muted}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, { opacity: !input.trim() || loading ? 0.5 : 1 }]}
            onPress={handleSend}
            disabled={!input.trim() || loading}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;