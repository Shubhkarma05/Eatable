import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByNutrients } from '../api/spoonacularApi';

const NutrientSearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useState({
    minCalories: 0,
    maxCalories: 800,
    minProtein: 0,
    maxProtein: 100,
    minCarbs: 0,
    maxCarbs: 100,
    minFat: 0,
    maxFat: 100,
    number: 10
  });
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
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginTop: 16,
      marginBottom: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    inputContainer: {
      flex: 1,
      marginRight: 8,
    },
    inputLabel: {
      fontSize: 12,
      color: theme.muted,
      marginBottom: 4,
    },
    input: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 10,
      color: theme.text,
    },
    sliderContainer: {
      marginBottom: 16,
    },
    sliderLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    sliderLabel: {
      fontSize: 10,
      color: theme.muted,
    },
    searchButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginVertical: 24,
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

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchRecipesByNutrients(searchParams);
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
        <Text style={styles.sectionTitle}>Calories</Text>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Min Calories</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.minCalories.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                minCalories: parseInt(text) || 0
              })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Max Calories</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.maxCalories.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                maxCalories: parseInt(text) || 0
              })}
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={2000}
            step={50}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
            value={searchParams.maxCalories}
            onValueChange={(value) => setSearchParams({
              ...searchParams,
              maxCalories: value
            })}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>0</Text>
            <Text style={styles.sliderLabel}>500</Text>
            <Text style={styles.sliderLabel}>1000</Text>
            <Text style={styles.sliderLabel}>1500</Text>
            <Text style={styles.sliderLabel}>2000</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Protein (g)</Text>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Min Protein</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.minProtein.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                minProtein: parseInt(text) || 0
              })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Max Protein</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.maxProtein.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                maxProtein: parseInt(text) || 0
              })}
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={200}
            step={5}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
            value={searchParams.maxProtein}
            onValueChange={(value) => setSearchParams({
              ...searchParams,
              maxProtein: value
            })}
          />
        </View>

        <Text style={styles.sectionTitle}>Carbs (g)</Text>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Min Carbs</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.minCarbs.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                minCarbs: parseInt(text) || 0
              })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Max Carbs</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={searchParams.maxCarbs.toString()}
              onChangeText={(text) => setSearchParams({
                ...searchParams,
                maxCarbs: parseInt(text) || 0
              })}
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={200}
            step={5}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={theme.border}
            thumbTintColor={theme.primary}
            value={searchParams.maxCarbs}
            onValueChange={(value) => setSearchParams({
              ...searchParams,
              maxCarbs: value
            })}
          />
        </View>

        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
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
                No recipes found with these nutritional requirements. Try adjusting your search criteria.
              </Text>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NutrientSearchScreen;