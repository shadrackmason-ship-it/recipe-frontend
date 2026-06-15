import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: { Authorization: 'Bearer guest-token' }
});

// your endpoints
export const getAllRecipes = () => api.get('/recipes');
export const getReviews = (recipeId) => api.get(`/recipes/${recipeId}/reviews`);
export const postReview = (recipeId, data) => api.post(`/recipes/${recipeId}/reviews`, data);
export const addFavorite = (recipeId) => api.post(`/recipes/${recipeId}/favorite`);
export const removeFavorite = (recipeId) => api.delete(`/recipes/${recipeId}/favorite`);

// teammates' endpoints
export const searchRecipes = (query = '', category = 'All') => {
  const params = new URLSearchParams();
  if (query.trim()) params.append('q', query.trim());
  if (category !== 'All') params.append('category', category);
  const qs = params.toString();
  return api.get(qs ? `/search/?${qs}` : '/search/');
};
export const getCategories = () => api.get('/categories/');
