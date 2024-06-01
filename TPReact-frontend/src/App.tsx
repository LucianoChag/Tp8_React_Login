import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import './components/NavBar.css';
import DondeEstamos from './components/DondeEstamos/DondeEstamos';
import Instrumento from './components/Instrumento/instrumento';
import Detalle from './components/Detalle/Detalle';
import Editar from './components/Editar/Editar';
import AñadirInstrumento from './components/AñadirInstrumento/AñadirInstrumento';
import Home from './components/Home/Home';
import Carrito from './components/Carrito/Carrito';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './components/Carrito/Carrito.css';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [user, setUser] = useState(null);  // Estado para guardar el usuario

  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  const onLoginSuccess = (user:any) => {
    setUser(user);  // Guarda el usuario en el estado
    // Aquí puedes también redireccionar al usuario a otra página si es necesario
  };

  const onLoginFail = (error:any) => {
    console.error('Login failed:', error);
    // Aquí puedes mostrar un mensaje de error usando un estado de error y renderizarlo en la UI
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar toggleCarrito={toggleCarrito} carritoVisible={carritoVisible} />
        <div className={`content-container ${carritoVisible ? 'with-carrito' : ''}`}>
          <Routes>
            {/* Rutas no protegidas */}
            <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} onLoginFail={onLoginFail} />} />
            <Route path="/" element={<Home />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/DondeEstamos" element={<DondeEstamos />} />
              <Route path="/Instrumentos" element={<Instrumento carrito={carrito} setCarrito={setCarrito} />} />
              <Route path="/Detalle/:id" element={<Detalle />} />
              <Route path="/Editar/:id" element={<Editar />} />
              <Route path="/Añadir" element={<AñadirInstrumento />} />
            </Route>
          </Routes>
        </div>
        {carritoVisible && (
          <div className="carrito-container">
            <Carrito carrito={carrito} setCarrito={setCarrito} toggleCarrito={toggleCarrito} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
