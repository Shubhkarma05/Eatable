import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, themeMode, toggleTheme } = useTheme();
  
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
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowIcon: {
      marginRight: 12,
      width: 24,
      alignItems: 'center',
    },
    rowText: {
      fontSize: 16,
      color: theme.text,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    themeOptionText: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 12,
    },
    themeOptionActive: {
      backgroundColor: theme.secondary,
    },
    version: {
      textAlign: 'center',
      color: theme.muted,
      marginTop: 24,
      fontSize: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                themeMode === 'light' && styles.themeOptionActive
              ]}
              onPress={() => toggleTheme('light')}
            >
              <Ionicons 
                name="sunny" 
                size={20} 
                color={themeMode === 'light' ? theme.primary : theme.text} 
              />
              <Text style={styles.themeOptionText}>Light</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                themeMode === 'dark' && styles.themeOptionActive
              ]}
              onPress={() => toggleTheme('dark')}
            >
              <Ionicons 
                name="moon" 
                size={20} 
                color={themeMode === 'dark' ? theme.primary : theme.text} 
              />
              <Text style={styles.themeOptionText}>Dark</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                themeMode === 'system' && styles.themeOptionActive
              ]}
              onPress={() => toggleTheme('system')}
            >
              <Ionicons 
                name="phone-portrait" 
                size={20} 
                color={themeMode === 'system' ? theme.primary : theme.text} 
              />
              <Text style={styles.themeOptionText}>System</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>
                  <Ionicons name="information-circle" size={20} color={theme.primary} />
                </View>
                <Text style={styles.rowText}>App Version</Text>
              </View>
              <Text style={{ color: theme.muted }}>1.0.0</Text>
            </View>
            
            <View style={[styles.row, styles.rowLast]}>
              <View style={styles.rowLeft}>
                <View style={styles.rowIcon}>
                  <Ionicons name="code" size={20} color={theme.primary} />
                </View>
                <Text style={styles.rowText}>Developer</Text>
              </View>
              <Text style={{ color: theme.muted }}>EatMate Team</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.version}>
          EatMate © {new Date().getFullYear()}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;