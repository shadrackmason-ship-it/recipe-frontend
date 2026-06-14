import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: { Authorization: 'Bearer guest-token' }
});

export const getAllRecipes = () => api.get('/recipes');
export const getReviews = (recipeId) => api.get(`/recipes/${recipeId}/reviews`);
export const postReview = (recipeId, data) => api.post(`/recipes/${recipeId}/reviews`, data);
export const addFavorite = (recipeId) => api.post(`/recipes/${recipeId}/favorite`);
export const removeFavorite = (recipeId) => api.delete(`/recipes/${recipeId}/favorite`);
