import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getCurrentUser } from "./services/authService";
import "./styles/App.css";
import jwtDecode from "jwt-decode";
import Tickets from "./components/TicketTable";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const initAuth = () => {
      const jwt = localStorage.getItem("jwtToken");
      // Suponiendo que estás utilizando jwt-decode para decodificar el token y obtener datos del usuario
      if (jwt) {
        const userFromToken = jwtDecode(jwt);
        console.log(userFromToken);
        setUser(userFromToken);
        localStorage.setItem("userType", userFromToken.userType);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/tickets"
            element={
              user &&
              (user.userType === "admin" || user.userType === "tech") ? (
                <Tickets />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
