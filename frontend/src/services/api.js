const RAW_URL = import.meta.env.VITE_API_URL || '/api';
const API_BASE_URL = RAW_URL === '/api' 
  ? '/api' 
  : (RAW_URL.endsWith('/api') ? RAW_URL : `${RAW_URL.replace(/\/$/, '')}/api`);

/**
 * Universal fetch wrapper handling JSON parsing, headers, and JWT auth tokens
 */
export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('sary_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 && token) {
        // Token invalid or expired
        localStorage.removeItem('sary_admin_token');
        localStorage.removeItem('sary_admin_info');
      }
      throw new Error(data.message || 'Network request failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default request;
