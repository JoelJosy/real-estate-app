"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { authAPI } from "@/lib/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId")
    const storedRole = localStorage.getItem("userRole")

    if (token && storedRole) {
      setIsLoggedIn(true)
      setUserRole(storedRole)
      setUserId(storedUserId)
    }

    setLoading(false)
  }, [])

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
  }

  const login = async (email, password, role) => {
    try {
      setLoading(true)
      setError(null)

      const response = await authAPI.login(email, password)

      // Store token and user info
      localStorage.setItem("token", response.token || "mock-token")
      localStorage.setItem("userId", response.userId || "mock-user-id")
      localStorage.setItem("userRole", role)
      localStorage.setItem("isLoggedIn", "true")

      setIsLoggedIn(true)
      setUserRole(role)
      setUserId(response.userId || "mock-user-id")

      showNotification("Login successful")

      return true
    } catch (err) {
      setError(err.error || "Login failed")
      showNotification(err.error || "Invalid credentials", "error")
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData, role) => {
    try {
      setLoading(true)
      setError(null)

      // Add user_type to userData
      userData.user_type = role

      const response = await authAPI.register(userData)

      // Auto-login after registration
      localStorage.setItem("token", response.token || "mock-token")
      localStorage.setItem("userId", response.id || "mock-user-id")
      localStorage.setItem("userRole", role)
      localStorage.setItem("isLoggedIn", "true")

      setIsLoggedIn(true)
      setUserRole(role)
      setUserId(response.id || "mock-user-id")

      showNotification("Registration successful")

      return true
    } catch (err) {
      setError(err.error || "Registration failed")
      showNotification(err.error || "Could not create account", "error")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("isLoggedIn")

    setIsLoggedIn(false)
    setUserRole(null)
    setUserId(null)

    showNotification("Logged out successfully")
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userId,
        loading,
        error,
        notification,
        showNotification,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

