import React, { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Input, Button, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      setUser(user); // Establece el usuario en el contexto
      navigate("/home"); // Redirige al usuario a Home
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <Row align="middle" justify="center" className="login-container">
      <Col xl={24}>
        <Card title="Inicio de sesión" className="login-card">
          <form onSubmit={handleLogin}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Divider />
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Divider />
            <Button type="primary" htmlType="submit" className="primary-button">
              Iniciar sesión
            </Button>
          </form>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginComponent;
