import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../api/spoonacularApi';

const IngredientSearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    input: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
      marginRight: 8,
    },
    addButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ingredientsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    ingredientChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      borderRadius: 16,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
    },
    ingredientText: {
      color: theme.primary,
      marginRight: 4,
    },
    searchButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    searchButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    emptyText: {
      textAlign: 'center',
      color: theme.muted,
      marginTop: 24,
    },
    loadingContainer: {
      padding: 20,
      alignItems: 'center',
    },
  });

  const addIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchRecipesByIngredients(ingredients.join(','));
      setRecipes(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter an ingredient"
            placeholderTextColor={theme.muted}
            value={ingredient}
            onChangeText={setIngredient}
            onSubmitEditing={addIngredient}
          />
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {ingredients.length > 0 && (
          <View style={styles.ingredientsContainer}>
            {ingredients.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.ingredientChip}
                onPress={() => removeIngredient(index)}
              >
                <Text style={styles.ingredientText}>{item}</Text>
                <Ionicons name="close-circle" size={16} color={theme.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={[
            styles.searchButton, 
            { opacity: ingredients.length === 0 ? 0.5 : 1 }
          ]}
          onPress={handleSearch}
          disabled={ingredients.length === 0 || loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Searching...' : 'Search Recipes'}
          </Text>
        </TouchableOpacity>

        {hasSearched && (
          <>
            <Text style={styles.resultsTitle}>Results</Text>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.primary} />
              </View>
            ) : recipes.length > 0 ? (
              <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <RecipeCard 
                    recipe={item} 
                    onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
                  />
                )}
              />
            ) : (
              <Text style={styles.emptyText}>
                No recipes found with these ingredients. Try adding different ingredients.
              </Text>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default IngredientSearchScreen;