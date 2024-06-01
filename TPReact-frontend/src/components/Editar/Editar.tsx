import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Editar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Editar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState({});
  const [instrumentos, setInstrumentos] = useState([]);
  const [formulario, setFormulario] = useState({
    id: '',
    cantidad_vendida: '',
    costo_envio: '',
    descripcion: '',
    imagen: '',
    instrumento: '',
    marca: '',
    modelo: '',
    precio: '',
    categoria_id: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/instrumentos/${id}`)
      .then((response) => response.json()) 
      .then((instrumento) => {
        setInstrumento(instrumento);
        setFormulario({
          ...formulario,
          id: instrumento.id,
          cantidad_vendida: instrumento.cantidad_vendida ? instrumento.cantidad_vendida.toString() : '',
          costo_envio: instrumento.costo_envio ? instrumento.costo_envio.toString() : '',
          descripcion: instrumento.descripcion || '',
          imagen: instrumento.imagen || '',
          instrumento: instrumento.instrumento || '',
          marca: instrumento.marca || '',
          modelo: instrumento.modelo || '',
          precio: instrumento.precio ? instrumento.precio.toString() : '',
          categoria_id: instrumento.categoria ? instrumento.categoria.id.toString() : '',
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos del instrumento:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/instrumentos/`)
      .then((response) => response.json()) 
      .then((instrumentos) => {
        setInstrumentos(instrumentos);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de instrumentos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "instrumento") {
      const selectedInstrument = instrumentos.find((instrumento) => instrumento.instrumento === value);
      if (selectedInstrument) {
        setFormulario({
          ...formulario,
          id: selectedInstrument.id,
          [name]: value,
          cantidad_vendida: selectedInstrument.cantidad_vendida ? selectedInstrument.cantidad_vendida.toString() : '',
          costo_envio: selectedInstrument.costo_envio ? selectedInstrument.costo_envio.toString() : '',
          descripcion: selectedInstrument.descripcion || '',
          imagen: selectedInstrument.imagen || '',
          marca: selectedInstrument.marca || '',
          modelo: selectedInstrument.modelo || '',
          precio: selectedInstrument.precio ? selectedInstrument.precio.toString() : '',
          categoria_id: selectedInstrument.categoria_id ? selectedInstrument.categoria_id.toString() : '',
        });
      }
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/categorias/${formulario.categoria_id}`)
      .then(response => response.json())
      .then(categoria => {
        const instrumento = {
          cantidad_vendida: formulario.cantidad_vendida,
          costo_envio: formulario.costo_envio,
          descripcion: formulario.descripcion,
          imagen: formulario.imagen,
          instrumento: formulario.instrumento,
          marca: formulario.marca,
          modelo: formulario.modelo,
          precio: formulario.precio,
          categoria
        };

        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(instrumento)
        };

        fetch(`http://localhost:8080/instrumentos/${formulario.id}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al actualizar el instrumento');
            }
            alert("Instrumento actualizado exitosamente");
            console.log('Instrumento actualizado exitosamente');
          })
          .catch(error => {
            console.error('Error al actualizar el instrumento:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener el objeto de categoría:', error);
      });
  };

  return (
    <div className="editar-container">
      <h1>Editar Instrumento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Instrumento:</label>
          <select
            name="instrumento"
            value={formulario.instrumento || ''}
            onChange={handleChange}
          >
            <option value="">Seleccionar instrumento</option>
            {instrumentos.map((instrumento) => (
              <option key={instrumento.id} value={instrumento.instrumento}>
                {instrumento.instrumento}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad Vendida:</label>
          <input
            required
            type="number"
            name="cantidad_vendida"
            value={formulario.cantidad_vendida}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Costo de Envío:</label>
          <input
            required
            type="text"
            name="costo_envio"
            value={formulario.costo_envio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            required
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input
            required
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Marca:</label>
          <input
            required
            type="text"
            name="marca"
            value={formulario.marca}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Modelo:</label>
          <input
            required
            type="text"
            name="modelo"
            value={formulario.modelo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            required
            type="number"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Categoría ID:</label>
          <input
            required
            type="number"
            name="categoria_id"
            value={formulario.categoria_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faCheck} /> Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Editar;