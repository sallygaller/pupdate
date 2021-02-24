const API_TOKEN = process.env.REACT_APP_GOOGLE_API_KEY;
const TOKEN_KEY = "test-auth-token";
const API_ENDPOINT =
  process.env.REACT_APP_BASE_URL || `http://localhost:8000/api`;

export { API_TOKEN, API_ENDPOINT, TOKEN_KEY };
