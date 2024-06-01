import { useState } from 'react';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["images/imagen1.jpg", "images/imagen2.jpg", "images/imagen3.jpg"]; // nombres de las imágenes

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  return (
    <div className="slider-container">
      <h2 className="title" style={{ fontFamily: 'Jersey 15', color: '#001F3F' }}>Bienvenidos!</h2>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              left: `${index * 100}%`,
              opacity: index === currentSlide ? 1 : 0, 
            }}
          >
            <img src={image} alt={`Instrumento ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="prev" onClick={prevSlide}>{''}</button>
      <button className="next" onClick={nextSlide}>{''}</button>
      <div className="descripcion-container">
        <p className="descripcion">Bienvenido la casa de música "La Guitarra de Lolo", tu destino para encontrar los mejores instrumentos musicales, equipos de sonido y accesorios. Resolvemos todo tipo de consultas, no dudes en llamarnos!</p>
      </div>
    </div>
  );
};

export default Home;