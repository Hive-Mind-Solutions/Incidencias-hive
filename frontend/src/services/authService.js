import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://127.0.0.1:5000/api/v1/auth";

export const login = async (email, password) => {
  const { data: token } = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  console.log("Received token:", token); // Añade esta línea
  localStorage.setItem("jwtToken", token.token);
  return jwtDecode(token.token);
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};

export const getCurrentUser = () => {
  const jwt = localStorage.getItem("jwtToken");
  return jwt ? jwtDecode(jwt) : null;
};
