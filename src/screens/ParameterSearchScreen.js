import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../api/spoonacularApi';

const ParameterSearchScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useState({
    query: '',
    cuisine: 'any',
    diet: 'any',
    number: 10
  });
  const [recipes, setRecipes] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
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
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      color: theme.text,
    },
    pickerContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      marginBottom: 16,
    },
    picker: {
      color: theme.text,
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
      marginBottom: 8,
    },
    resultsCount: {
      fontSize: 14,
      color: theme.muted,
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
    if (!searchParams.query && searchParams.cuisine === 'any' && searchParams.diet === 'any') {
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchRecipes(searchParams);
      setRecipes(results.results || []);
      setTotalResults(results.totalResults || 0);
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recipe Name or Keywords</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., pasta, burger, salad"
            placeholderTextColor={theme.muted}
            value={searchParams.query}
            onChangeText={(text) => setSearchParams({...searchParams, query: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cuisine</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={searchParams.cuisine}
              style={styles.picker}
              onValueChange={(value) => setSearchParams({...searchParams, cuisine: value})}
            >
              <Picker.Item label="Any Cuisine" value="any" />
              <Picker.Item label="African" value="african" />
              <Picker.Item label="American" value="american" />
              <Picker.Item label="British" value="british" />
              <Picker.Item label="Chinese" value="chinese" />
              <Picker.Item label="French" value="french" />
              <Picker.Item label="Indian" value="indian" />
              <Picker.Item label="Italian" value="italian" />
              <Picker.Item label="Japanese" value="japanese" />
              <Picker.Item label="Korean" value="korean" />
              <Picker.Item label="Mexican" value="mexican" />
              <Picker.Item label="Thai" value="thai" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Diet</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={searchParams.diet}
              style={styles.picker}
              onValueChange={(value) => setSearchParams({...searchParams, diet: value})}
            >
              <Picker.Item label="Any Diet" value="any" />
              <Picker.Item label="Gluten Free" value="gluten free" />
              <Picker.Item label="Ketogenic" value="ketogenic" />
              <Picker.Item label="Vegetarian" value="vegetarian" />
              <Picker.Item label="Vegan" value="vegan" />
              <Picker.Item label="Pescetarian" value="pescetarian" />
              <Picker.Item label="Paleo" value="paleo" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.searchButton, 
            { opacity: (!searchParams.query && searchParams.cuisine === 'any' && searchParams.diet === 'any') ? 0.5 : 1 }
          ]}
          onPress={handleSearch}
          disabled={(!searchParams.query && searchParams.cuisine === 'any' && searchParams.diet === 'any') || loading}
        >
          <Text style={styles.searchButtonText}>
            {loading ? 'Searching...' : 'Search Recipes'}
          </Text>
        </TouchableOpacity>

        {hasSearched && (
          <>
            <Text style={styles.resultsTitle}>Results</Text>
            {totalResults > 0 && (
              <Text style={styles.resultsCount}>Found {totalResults} recipes</Text>
            )}
            
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
                No recipes found with these parameters. Try adjusting your search criteria.
              </Text>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ParameterSearchScreen;