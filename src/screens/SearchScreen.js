import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  
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
    headerSubtitle: {
      fontSize: 14,
      color: theme.muted,
      marginTop: 4,
    },
    content: {
      padding: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardIcon: {
      marginRight: 12,
      backgroundColor: theme.secondary,
      padding: 10,
      borderRadius: 8,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: theme.muted,
      marginBottom: 12,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });

  const searchOptions = [
    {
      title: 'Search by Ingredients',
      description: 'Find recipes based on ingredients you have',
      icon: 'leaf-outline',
      screen: 'IngredientSearch',
    },
    {
      title: 'Search by Parameters',
      description: 'Find recipes by cuisine, diet, and more',
      icon: 'restaurant-outline',
      screen: 'ParameterSearch',
    },
    {
      title: 'Search by Nutrients',
      description: 'Find recipes that match your nutritional goals',
      icon: 'fitness-outline',
      screen: 'NutrientSearch',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Recipes</Text>
        <Text style={styles.headerSubtitle}>Choose a search method to find your perfect recipe</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {searchOptions.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            onPress={() => navigation.navigate(option.screen)}
          >
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <Ionicons name={option.icon} size={24} color={theme.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{option.title}</Text>
                <Text style={styles.cardDescription}>{option.description}</Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Search</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;