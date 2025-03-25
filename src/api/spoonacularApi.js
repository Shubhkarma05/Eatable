import { SPOONACULAR_API_KEY } from '@env';

const API_BASE_URL = 'https://api.spoonacular.com';
const API_KEY = SPOONACULAR_API_KEY;

// Search recipes by ingredients
export const searchRecipesByIngredients = async (ingredients, number = 10) => {
  try {
    const url = `${API_BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=${number}&ranking=1`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching by ingredients:', error);
    throw error;
  }
};

// Search recipes by nutrients
export const searchRecipesByNutrients = async (params) => {
  try {
    let url = `${API_BASE_URL}/recipes/findByNutrients?apiKey=${API_KEY}`;
    
    // Add all provided nutrient parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url += `&${key}=${value}`;
      }
    });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching by nutrients:', error);
    throw error;
  }
};

// Search recipes by parameters
export const searchRecipes = async (params) => {
  try {
    let url = `${API_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
    
    // Add all provided search parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== 'any') {
        url += `&${key}=${value}`;
      }
    });
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Get recipe information
export const getRecipeInformation = async (id, includeNutrition = false) => {
  try {
    const url = `${API_BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=${includeNutrition}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw error;
  }
};

// Get ingredient substitutes
export const getIngredientSubstitutes = async (ingredientName) => {
  try {
    const url = `${API_BASE_URL}/food/ingredients/substitutes?apiKey=${API_KEY}&ingredientName=${ingredientName}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting ingredient substitutes:', error);
    throw error;
  }
};