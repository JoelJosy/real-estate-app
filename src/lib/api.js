import axios from "axios"

const API_URL = "http://localhost:5001"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add interceptor to include auth token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // console.log("API Error:", error.response?.data || error.message)
    // throw error.response?.data || { error: "API request failed" }
  },
)

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      return response
    } catch (error) {
      console.error("Login error:", error)
      // For demo purposes, return mock data
      return { token: "mock-token", user_type: "seller", id: "seller1" }
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData)
      return response
    } catch (error) {
      console.error("Registration error:", error)
      
    }
  },
}

// Property API calls
export const propertyAPI = {
  getAllProperties: async () => {
    try {
      const response = await api.get("/properties")
      return response
    } catch (error) {
      console.error("Failed to fetch properties:", error)
      // Fallback to mock data
      const { mockProperties } = await import("./mock-data")
      return mockProperties
    }
  },

  searchProperties: async (params) => {
    try {
      const response = await api.get("/properties/search", { params })
      return response
    } catch (error) {
      console.error("Search failed:", error)
    }
  },

  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/by/${id}`)
      return response;
    } catch (error) {
      console.error("Failed to fetch property:", error)
      // Fallback to mock data
      const { mockProperties } = await import("./mock-data")
      return mockProperties.find((p) => p.id === Number(id))
    }
  },

  updateProperty: async (id, updatedData) => {
    try {
      const response = await api.put(`/properties/${id}`, updatedData);
      console.log("Updated Property:", response);
      alert("Property updated successfully!");
      return response;
    } catch (error) {
      console.error("Error updating property:", error);
      alert(error.message || "Failed to update property.");
      throw error;
    }
  },


  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`)
      return response
    } catch (error) {
      console.error("Failed to delete property:", error)
      throw error
    }
  },

  getSellerProperties: async (sellerId) => {
    try {
      const response = await api.get(`/properties/seller/${sellerId}`)
      return response
    } catch (error) {
      console.error("Failed to fetch seller properties:", error)
      // Fallback to mock data
      const { mockProperties } = await import("./mock-data")
      return mockProperties.filter((p) => p.sellerId === sellerId)
    }
  },

  addProperty: async (propertyData) => {
    try {
      const response = await api.post("/properties", propertyData)
      return response
    } catch (error) {
      console.error("Failed to add property:", error)
      throw error
    }
  },
}

// Favorite API calls
export const favoritesAPI = {
  addToFavorites: async (propertyId) => {
    try {
      const response = await api.post("/favorites/add", { propertyId });
      return response.data;
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert("Failed to add Favorites");
      throw error;
    }
  },

  removeFromFavorites: async (propertyId) => {
    try {
      const response = await api.delete("/favorites/remove", { data: { propertyId } });
      // alert("Removed from favorites");
      return response.data;
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      alert("Failed to remove from favorites");
      throw error;
    }
  },

  getFavorites: async (propertyId) => {
    try {
      const response = await api.get("/favorites/get");
      return response;
    } catch (error) {
      console.log("Failed to retrieve favorites:");
      // alert("Failed to retrieve favorites");
      // throw error;
    }
  },

};

// User API calls
export const userAPI = {
  getUserProfile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: "Failed to fetch user profile" }
    }
  },

  updateUserProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: "Failed to update user profile" }
    }
  },

  saveProperty: async (propertyId) => {
    try {
      const response = await api.post(`/users/save-property/${propertyId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: "Failed to save property" }
    }
  },

  unsaveProperty: async (propertyId) => {
    try {
      const response = await api.delete(`/users/save-property/${propertyId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || { error: "Failed to unsave property" }
    }
  },
}

export default api

