import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import './Login.css'; // Asegúrate de importar el CSS aquí

interface LoginProps {
  onLoginSuccess: (user: any) => void;  
  onLoginFail: (error: string) => void; 
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onLoginFail }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const hashedPassword = CryptoJS.SHA1(password).toString(CryptoJS.enc.Hex);
      const response = await axios.post('http://localhost:8080/login', null, {
        params: {
          nombreUsuario: username,
          clave: hashedPassword
        }
      });

      if (response.status === 200) {
        onLoginSuccess(response.data);
      } else {
        onLoginFail('Credenciales incorrectas.');
      }
    } catch (error: any) {
      onLoginFail(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
