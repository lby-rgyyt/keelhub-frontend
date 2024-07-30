import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 使用 react-router-dom 进行导航
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 用于显示错误信息
  const navigate = useNavigate(); // 用于导航

  useEffect(() => {
    // 检查 localStorage 中是否存在 token
    const token = localStorage.getItem("token");
    if (token) {
      // 如果存在 token，则自动重定向到 /home
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      // 提取 token
      const { token } = response.data;

      // 保存 token 到 localStorage
      localStorage.setItem("token", token);

      // 清除错误信息
      setError("");
      navigate("/home"); // 登录成功后重定向到 /home
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "An error occurred");
      } else {
        setError("Network error occurred");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
