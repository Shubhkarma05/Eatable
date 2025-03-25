import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const RecipeCard = ({ recipe, onPress }) => {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 180,
    },
    content: {
      padding: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    infoContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    infoText: {
      marginLeft: 4,
      fontSize: 12,
      color: theme.muted,
    },
    badgeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    badge: {
      backgroundColor: theme.secondary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
      marginBottom: 8,
    },
    badgeText: {
      fontSize: 10,
      color: theme.primary,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: recipe.image || 'https://via.placeholder.com/400x300' }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{recipe.title}</Text>
        
        {recipe.readyInMinutes && (
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={14} color={theme.muted} />
              <Text style={styles.infoText}>{recipe.readyInMinutes} mins</Text>
            </View>
            {recipe.servings && (
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={14} color={theme.muted} />
                <Text style={styles.infoText}>{recipe.servings} servings</Text>
              </View>
            )}
          </View>
        )}
        
        {recipe.usedIngredientCount !== undefined && (
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.usedIngredientCount} ingredients used</Text>
            </View>
            {recipe.missedIngredientCount > 0 && (
              <View style={[styles.badge, { backgroundColor: '#FFF3E0' }]}>
                <Text style={[styles.badgeText, { color: '#FF9800' }]}>{recipe.missedIngredientCount} missing</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;