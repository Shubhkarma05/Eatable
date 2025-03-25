import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
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
    banner: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 16,
      overflow: 'hidden',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    bannerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      padding: 16,
    },
    bannerTitle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    bannerSubtitle: {
      color: '#FFFFFF',
      fontSize: 14,
    },
  });

  const features = [
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
    {
      title: 'Ingredient Substitutes',
      description: 'Find substitutes for ingredients you don\'t have',
      icon: 'swap-horizontal-outline',
      screen: 'Substitute',
    },
    {
      title: 'Ask EatMate',
      description: 'Get cooking advice from our AI assistant',
      icon: 'chatbubble-outline',
      screen: 'Chatbot',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EatMate</Text>
        <Text style={styles.headerSubtitle}>Your personal food assistant</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.banner} onPress={() => navigation.navigate('Search')}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
            style={styles.bannerImage} 
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Find Your Perfect Recipe</Text>
            <Text style={styles.bannerSubtitle}>Discover delicious meals based on your preferences</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Features</Text>
        
        {features.map((feature, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            onPress={() => {
              if (feature.screen === 'IngredientSearch' || 
                  feature.screen === 'ParameterSearch' || 
                  feature.screen === 'NutrientSearch') {
                navigation.navigate('Search', { screen: feature.screen });
              } else {
                navigation.navigate(feature.screen);
              }
            }}
          >
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <Ionicons name={feature.icon} size={24} color={theme.primary} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDescription}>{feature.description}</Text>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Try Now</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;