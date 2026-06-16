import axios from "axios";

const BASE = import.meta.env.VITE_API_URL ?? "https://recipe-backend-30j8.onrender.com";

const api = axios.create({ baseURL: BASE });


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const loginUser    = (data) => api.post("/api/auth/login", data);
export const registerUser = (data) => api.post("/api/auth/register", data);
export const getMe        = ()     => api.get("/api/auth/me");

export const getAllRecipes  = ()                  => api.get("/recipes/");
export const getRecipe      = (id)               => api.get(`/recipes/${id}`);
export const createRecipe   = (data)             => api.post("/recipes/", data);
export const updateRecipe   = (id, data)         => api.put(`/recipes/${id}`, data);
export const deleteRecipe   = (id)               => api.delete(`/recipes/${id}`);


export const searchRecipes       = (query = "", category = "") => {
  // Use dedicated endpoints based on what's provided
  if (category && category !== "All") {
    return api.get("/search/category", { params: { category } });
  }
  return api.get("/search/", { params: { q: query || undefined } });
};
export const searchByIngredient  = (ingredient) =>
  api.get("/search/ingredients", { params: { ingredient } });

export const getCategories = () => api.get("/categories/");

export const getReviews     = (recipeId) => api.get(`/recipes/${recipeId}/reviews`);
export const postReview     = (recipeId, data) => api.post(`/recipes/${recipeId}/reviews`, data);
export const addFavorite    = (recipeId) => api.post(`/recipes/${recipeId}/favorite`);
export const removeFavorite = (recipeId) => api.delete(`/recipes/${recipeId}/favorite`);