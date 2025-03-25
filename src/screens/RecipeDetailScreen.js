import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getRecipeInformation } from '../api/spoonacularApi';

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const { theme } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('instructions');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 250,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    summary: {
      fontSize: 14,
      color: theme.muted,
      marginBottom: 16,
    },
    infoContainer: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: theme.secondary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
    },
    infoText: {
      marginLeft: 4,
      color: theme.primary,
      fontWeight: '500',
    },
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
    },
    tabText: {
      color: theme.muted,
      fontWeight: '500',
    },
    activeTabText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
    instructionItem: {
      marginBottom: 16,
    },
    instructionNumber: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 4,
    },
    instructionText: {
      fontSize: 14,
      color: theme.text,
    },
    ingredientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    ingredientDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
      marginRight: 8,
    },
    ingredientText: {
      fontSize: 14,
      color: theme.text,
    },
    nutritionContainer: {
      marginBottom: 16,
    },
    nutritionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 12,
    },
    nutritionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    nutritionName: {
      fontSize: 14,
      color: theme.text,
    },
    nutritionValue: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
    },
    nutritionBadge: {
      backgroundColor: theme.secondary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    nutritionBadgeText: {
      fontSize: 10,
      color: theme.primary,
    },
    calorieBoxes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    calorieBox: {
      flex: 1,
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      marginHorizontal: 4,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    calorieValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 4,
    },
    calorieLabel: {
      fontSize: 12,
      color: theme.muted,
    },
    errorText: {
      textAlign: 'center',
      color: theme.error,
      marginTop: 24,
    },
  });

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const recipeData = await getRecipeInformation(recipeId, true);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  // Helper function to remove HTML tags from summary
  const stripHtml = (html) => {
    return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>Failed to load recipe details</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image 
          source={{ uri: recipe.image || 'https://via.placeholder.com/400x300' }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          
          {recipe.summary && (
            <Text style={styles.summary}>
              {stripHtml(recipe.summary).substring(0, 150)}...
            </Text>
          )}
          
          <View style={styles.infoContainer}>
            {recipe.readyInMinutes && (
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={16} color={theme.primary} />
                <Text style={styles.infoText}>{recipe.readyInMinutes} mins</Text>
              </View>
            )}
            {recipe.servings && (
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={16} color={theme.primary} />
                <Text style={styles.infoText}>{recipe.servings} servings</Text>
              </View>
            )}
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'instructions' && styles.activeTab]}
              onPress={() => setActiveTab('instructions')}
            >
              <Text style={[styles.tabText, activeTab === 'instructions' && styles.activeTabText]}>
                Instructions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'ingredients' && styles.activeTab]}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text style={[styles.tabText, activeTab === 'ingredients' && styles.activeTabText]}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
              onPress={() => setActiveTab('nutrition')}
            >
              <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
                Nutrition
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'instructions' && (
            <View>
              {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                recipe.analyzedInstructions[0].steps.map((step) => (
                  <View key={step.number} style={styles.instructionItem}>
                    <Text style={styles.instructionNumber}>Step {step.number}</Text>
                    <Text style={styles.instructionText}>{step.step}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.errorText}>No instructions available for this recipe.</Text>
              )}
            </View>
          )}
          
          {activeTab === 'ingredients' && (
            <View>
              {recipe.extendedIngredients ? (
                recipe.extendedIngredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <View style={styles.ingredientDot} />
                    <Text style={styles.ingredientText}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.errorText}>No ingredient information available for this recipe.</Text>
              )}
            </View>
          )}
          
          {activeTab === 'nutrition' && (
            <View>
              {recipe.nutrition ? (
                <>
                  <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Caloric Breakdown</Text>
                    <View style={styles.calorieBoxes}>
                      <View style={styles.calorieBox}>
                        <Text style={styles.calorieValue}>
                          {Math.round(recipe.nutrition.caloricBreakdown.percentProtein)}%
                        </Text>
                        <Text style={styles.calorieLabel}>Protein</Text>
                      </View>
                      <View style={styles.calorieBox}>
                        <Text style={styles.calorieValue}>
                          {Math.round(recipe.nutrition.caloricBreakdown.percentFat)}%
                        </Text>
                        <Text style={styles.calorieLabel}>Fat</Text>
                      </View>
                      <View style={styles.calorieBox}>
                        <Text style={styles.calorieValue}>
                          {Math.round(recipe.nutrition.caloricBreakdown.percentCarbs)}%
                        </Text>
                        <Text style={styles.calorieLabel}>Carbs</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.nutritionContainer}>
                    <Text style={styles.nutritionTitle}>Nutrients</Text>
                    {recipe.nutrition.nutrients.slice(0, 8).map((nutrient, index) => (
                      <View key={index} style={styles.nutritionRow}>
                        <Text style={styles.nutritionName}>{nutrient.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.nutritionValue}>
                            {nutrient.amount} {nutrient.unit}
                          </Text>
                          {nutrient.percentOfDailyNeeds && (
                            <View style={styles.nutritionBadge}>
                              <Text style={styles.nutritionBadgeText}>
                                {Math.round(nutrient.percentOfDailyNeeds)}% DV
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <Text style={styles.errorText}>No nutritional information available for this recipe.</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;