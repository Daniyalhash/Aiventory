import axios from 'axios';
import { use } from 'react';

// Base API instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/aiventory/',
  timeout: 5000, // Set timeout to prevent long waits
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch Total Products API
export const fetchTotalProducts = async (userId) => {
  if (!userId) throw new Error('User ID is required');

  try {
    const response = await api.get('/get-total-products/', { params: { user_id: userId } });
    return response.data; // Return data directly
  } catch (error) {
    console.error("Error fetching total products:", error);
    throw error;
  }
};
// Fetch Dashboard Visuals (Benchmark Data)
export const fetchDashboardVisuals =async (userId) => {
  if (!userId) throw new Error('User ID is required');

  try {
    const response = await api.get('/get-dashbaord-visuals/', { params: { user_id: userId } });
    return response.data.benchmarks; // Return benchmarks directly
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard visuals");
  }
};
//fetch categories for productbenchmarkselection
export const fetchCategories = async(userId) =>{
  if (!userId) throw new Error("User ID is required");
  try{
    const response = await api.get('http://127.0.0.1:8000/aiventory/get-categories/',{params : { user_id : userId }});
    return response.data;
  }catch(error){
    throw new Error(error.response?.data?.message || "Failed to fetch categories of Product");

  }

}; 
//fetch categories for productbenchmarkselection
export const fetchProductsByCategory = async (userId, category) => {
  if (!userId) throw new Error("User ID is required");
  try{
    const response = await api.get('http://127.0.0.1:8000/aiventory/get-top-products-by-category/',{        params: { user_id: userId, category: category }});
    return response.data.products || []; // Ensure empty array if products is not available
  }catch(error){
    throw new Error(error.response?.data?.message || "Failed to fetch categories of Product");

  }

}; 
// You can add more API functions here...
