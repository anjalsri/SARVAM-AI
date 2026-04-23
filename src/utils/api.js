const API_BASE = 'http://127.0.0.1:8000/api';

export const getTokens = () => {
  const tokens = localStorage.getItem('auth_tokens');
  return tokens ? JSON.parse(tokens) : null;
};

export const saveTokens = (tokens) => {
  localStorage.setItem('auth_tokens', JSON.stringify(tokens));
};

export const removeTokens = () => {
  localStorage.removeItem('auth_tokens');
};

export const apiFetch = async (endpoint, options = {}) => {
  let tokens = getTokens();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (tokens?.access_token) {
    headers['Authorization'] = `Bearer ${tokens.access_token}`;
  }

  // If the body is FormData, don't set Content-Type so the browser sets the boundary
  if (options.body instanceof FormData) {
      delete headers['Content-Type'];
  }

  let response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && tokens?.refresh_token) {
    // Attempt refresh
    try {
      const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: tokens.refresh_token }),
      });

      if (refreshResponse.ok) {
        const newTokens = await refreshResponse.json();
        saveTokens(newTokens);
        
        // Update header and retry original request
        headers['Authorization'] = `Bearer ${newTokens.access_token}`;
        response = await fetch(`${API_BASE}${endpoint}`, {
          ...options,
          headers,
        });
      } else {
        removeTokens();
        throw new Error("Session_expired");
      }
    } catch (e) {
      removeTokens();
      throw e;
    }
  }

  return response;
};
