// src/lib/tokenManager.ts

let accessToken: string | null = null;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken"); // Check localStorage only in the browser
}

export const setAccessToken = (token: string): void => {
  accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token); // Persist to localStorage
  }
};

export const getAccessToken = (): string | null => accessToken;

export const clearAccessToken = (): void => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken"); // Clear from localStorage
  }
};

// Token validation helper
export const validateToken = async (): Promise<boolean> => {
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
