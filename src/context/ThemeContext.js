import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define theme colors
const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#4CAF50',
  secondary: '#E8F5E9',
  card: '#FFFFFF',
  border: '#E0E0E0',
  notification: '#FF9800',
  error: '#F44336',
  success: '#4CAF50',
  muted: '#757575',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#81C784',
  secondary: '#1B5E20',
  card: '#1E1E1E',
  border: '#333333',
  notification: '#FFB74D',
  error: '#EF5350',
  success: '#66BB6A',
  muted: '#BDBDBD',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
  const [theme, setTheme] = useState(deviceTheme === 'dark' ? darkTheme : lightTheme);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem('themeMode');
        if (savedThemeMode) {
          setThemeMode(savedThemeMode);
          if (savedThemeMode === 'dark') {
            setTheme(darkTheme);
          } else if (savedThemeMode === 'light') {
            setTheme(lightTheme);
          } else {
            // System default
            setTheme(deviceTheme === 'dark' ? darkTheme : lightTheme);
          }
        }
      } catch (error) {
        console.log('Error loading theme', error);
      }
    };
    
    loadTheme();
  }, [deviceTheme]);

  // Update theme when device theme changes (if using system theme)
  useEffect(() => {
    if (themeMode === 'system') {
      setTheme(deviceTheme === 'dark' ? darkTheme : lightTheme);
    }
  }, [deviceTheme, themeMode]);

  const toggleTheme = async (mode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeMode(mode);
      
      if (mode === 'dark') {
        setTheme(darkTheme);
      } else if (mode === 'light') {
        setTheme(lightTheme);
      } else {
        // System default
        setTheme(deviceTheme === 'dark' ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.log('Error saving theme', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);