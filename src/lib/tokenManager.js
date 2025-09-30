// src/utils/tokenManager.js

let accessToken = null;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken"); // Check localStorage only in the browser
}

export const setAccessToken = (token) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token); // Persist to localStorage
  }
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken"); // Clear from localStorage
  }
};

// Token validation helper
export const validateToken = async () => {
  const token = getAccessToken();
  if (!token) {
    return false;
  }
  
  try {
    const response = await fetch('https://api.fayidaacademy.com/login_register/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    if (response.status === 401) {
      clearAccessToken();
      return false;
    }
    
    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};