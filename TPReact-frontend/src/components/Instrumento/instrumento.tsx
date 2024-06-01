import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Instrumento/intrumentos.css";
import { faTrashAlt, faEdit, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Instrumento = ({ carrito, setCarrito }) => {
  const [instrumentos, setInstrumentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/instrumentos/")
      .then((response) => response.json())
      .then((instrumento) => setInstrumentos(instrumento));

    fetch("http://localhost:8080/categorias/")
      .then((response) => response.json())
      .then((categorias) => setCategorias(categorias));
  }, []);

  const handleClick = (instrumento) => {
    const detalleUrl = `/detalle/${instrumento.id}`;
    navigate(detalleUrl);
  };

  const handleClickEditar = (id) => {
    const detalleUrl = `/editar/${id}`;
    navigate(detalleUrl);
  };

  const handleClickEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este instrumento?");
    if (confirmacion) {
      fetch(`http://localhost:8080/instrumentos/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          setInstrumentos(prevInstrumentos => prevInstrumentos.filter(item => item.id !== id));
        }
      })
      .catch(error => {
        console.error('Error al eliminar el instrumento:', error);
      });
    }
  };

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleAñadirCarrito = (instrumento) => {
    const existente = carrito.find(item => item.id === instrumento.id);
    if (existente) {
      setCarrito(carrito.map(item =>
        item.id === instrumento.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...instrumento, cantidad: 1 }]);
    }
  };

  const handleEliminarCarrito = (instrumento) => {
    const existente = carrito.find(item => item.id === instrumento.id);
    if (existente) {
      if (existente.cantidad > 1) {
        setCarrito(carrito.map(item =>
          item.id === instrumento.id ? { ...item, cantidad: item.cantidad - 1 } : item
        ));
      } else {
        setCarrito(carrito.filter(item => item.id !== instrumento.id));
      }
    }
  };

  const filteredInstrumentos = categoriaSeleccionada
    ? instrumentos.filter(instrumento => instrumento.categoria && instrumento.categoria.denominacion === categoriaSeleccionada)
    : instrumentos;

  return (
    <div className="instrumentos-container">
      <div className="categoria-seleccion">
        <label>Seleccione una categoría:
          <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
            <option value="">Todos</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</option>
            ))}
          </select>
        </label>
      </div>
      {filteredInstrumentos.map(instrumento => (
        <div key={instrumento.id} className="Articulo">
          <div className="imagen-instrumento">
            <img src={"/img/" + instrumento.imagen} alt={instrumento.instrumento} />
          </div>
          <div className="detalles">
            <h2>{instrumento.instrumento}</h2>
            <p>{instrumento.precio}$</p>
            {instrumento.costo_envio === "G" ? (
              <p style={{ color: 'green' }}>Envío Gratis</p>
            ) : (
              <p style={{ color: '#007BA7' }}>El costo de envío es de: {instrumento.costo_envio}</p>
            )}
            <p>{instrumento.cantidad_vendida} vendidos</p>
            <div className="botones">
              <button onClick={() => handleClick(instrumento)} className="boton">Ir a Detalle</button>
              <button onClick={() => handleClickEditar(instrumento.id)} className="boton">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleClickEliminar(instrumento.id)} className="boton">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button onClick={() => handleAñadirCarrito(instrumento)} className="boton">
                <FontAwesomeIcon icon={faCartPlus} /> Añadir al Carrito
              </button>
              <button onClick={() => handleEliminarCarrito(instrumento)} className="boton">
                Eliminar del Carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instrumento;