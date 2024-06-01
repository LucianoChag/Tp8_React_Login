
import React, { useState } from 'react';
import './Carrito.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PreferenceMP from '../../types/PreferenceMP';
import Pedido from '../../types/PedidoMP';
import { FaTimes } from 'react-icons/fa';

async function createPreferenceMP(pedido?: Pedido) {
  const urlServer = 'http://localhost:8080/pedido/api/create_preference_mp';
  const method: string = "POST";
  const response = await fetch(urlServer, {
    method: method,
    body: JSON.stringify(pedido),
    headers: {
      "Content-Type": 'application/json'
    }
  });
  return await response.json() as PreferenceMP;
}

const Carrito = ({ carrito, setCarrito, toggleCarrito }) => {
  const [idPreference, setIdPreference] = useState<string>('');

  initMercadoPago('TEST-eb47d0f2-fe8e-45d7-9ff3-ec3171257875');

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const getPreferenceMP = async () => {
    const response: PreferenceMP = await createPreferenceMP({
      id: 0,
      titulo: 'Pedido carrito instrumentos',
      montoTotal: parseInt(calcularTotal())
    });
    console.log("Preference id: " + response.id);
    if (response) {
      setIdPreference(response.id);
    }
  };

  const handleComprar = async () => {
    const totalPedido = calcularTotal();
    const pedidoResponse = await fetch('http://localhost:8080/pedido/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalPedido }),
    });

    if (!pedidoResponse.ok) {
      console.error('Error al crear el pedido:', pedidoResponse.status, pedidoResponse.statusText);
      alert('Error al crear el pedido');
      return;
    }

    const pedidosResponse = await fetch('http://localhost:8080/pedido/');
    if (!pedidosResponse.ok) {
      console.error('Error al obtener el ID del pedido:', pedidosResponse.status, pedidosResponse.statusText);
      alert('Error al obtener el ID del pedido');
      return;
    }

    const pedidos = await pedidosResponse.json();
    const ultimoPedido = pedidos[pedidos.length - 1];
    const pedidoId = ultimoPedido.id;

    const detallesPromises = carrito.map(item => {
      const detalleData = {
        instrumentoId: item.id,
        cantidad: item.cantidad,
        pedidoId: pedidoId,
      };
      console.log('Datos del detalle:', detalleData);

      return fetch('http://localhost:8080/pedidoDetalle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalleData),
      });
    });

    const detallesResponses = await Promise.all(detallesPromises);

    if (detallesResponses.some(response => !response.ok)) {
      console.error('Error al crear los detalles del pedido');
      alert('Error al crear los detalles del pedido');
      return;
    }

    alert('Compra realizada con éxito!');
    setCarrito([]);
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h2>Carrito de Compras</h2>
        <button onClick={toggleCarrito} className="close-carrito-button">
          <FaTimes />
        </button>
      </div>
      {carrito.length === 0 ? (
        <p>Carrito Vacío</p>
      ) : (
        <div>
          {carrito.map(item => (
            <div key={item.id} className="carrito-item">
              <img src={"/img/" + item.imagen} alt={item.instrumento} style={{ width: '100px' }} />
              <div className="detalles-item">
                <h3>{item.instrumento}</h3>
                <p>{item.precio}$ x {item.cantidad}</p>
                <p>Subtotal: {item.precio * item.cantidad}$</p>
              </div>
            </div>
          ))}
          <h3>Total: {calcularTotal()}$</h3>
          <div>
            <button 
              onClick={getPreferenceMP} 
              className="comprar-button">
              Comprar
            </button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
              <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
