import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getIngredientSubstitutes } from '../api/spoonacularApi';

const SubstituteScreen = () => {
  const { theme } = useTheme();
  const [ingredient, setIngredient] = useState('');
  const [substitutes, setSubstitutes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: theme.muted,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    input: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
      marginRight: 8,
    },
    searchButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultsContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    substituteItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    bulletPoint: {
      color: theme.primary,
      fontSize: 16,
      marginRight: 8,
      marginTop: 2,
    },
    substituteText: {
      flex: 1,
      fontSize: 14,
      color: theme.text,
      lineHeight: 20,
    },
    message: {
      fontSize: 14,
      color: theme.muted,
      textAlign: 'center',
      marginTop: 8,
    },
    errorText: {
      color: theme.error,
      textAlign: 'center',
      marginTop: 16,
    },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
    },
    exampleContainer: {
      marginTop: 24,
    },
    exampleTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 12,
    },
    exampleChips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    exampleChip: {
      backgroundColor: theme.secondary,
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    exampleChipText: {
      color: theme.primary,
    },
  });

  const examples = [
    'butter', 'milk', 'eggs', 'sugar', 'flour', 
    'rice', 'vinegar', 'oil', 'tomatoes', 'onions'
  ];

  const handleSearch = async () => {
    if (!ingredient.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await getIngredientSubstitutes(ingredient.trim());
      setSubstitutes(result);
    } catch (error) {
      console.error('Error getting substitutes:', error);
      setError('Failed to get substitutes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExamplePress = (example) => {
    setIngredient(example);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Ingredient Substitutes</Text>
          <Text style={styles.subtitle}>
            Find substitutes for ingredients you don't have on hand
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter an ingredient"
            placeholderTextColor={theme.muted}
            value={ingredient}
            onChangeText={setIngredient}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity 
            style={[styles.searchButton, { opacity: !ingredient.trim() ? 0.5 : 1 }]}
            onPress={handleSearch}
            disabled={!ingredient.trim() || loading}
          >
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        ) : substitutes ? (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              Substitutes for {substitutes.ingredient}
            </Text>
            
            {substitutes.substitutes && substitutes.substitutes.length > 0 ? (
              substitutes.substitutes.map((substitute, index) => (
                <View key={index} style={styles.substituteItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.substituteText}>{substitute}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.message}>No substitutes found for this ingredient.</Text>
            )}
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Try these examples:</Text>
          <View style={styles.exampleChips}>
            {examples.map((example, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.exampleChip}
                onPress={() => handleExamplePress(example)}
              >
                <Text style={styles.exampleChipText}>{example}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubstituteScreen;