import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Logo from '../../logo.png';
import './Home.css'; // Archivo CSS para las animaciones

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section className="hero has-background-light is-fullheight is-fullwidth">
      <div className="hero-head" style={{ backgroundColor: '#90EE90', padding: '10px 0' }}>
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column" style={{ display: 'flex', alignItems: 'center' }}>
              <a className="navbar-item" href="/" style={{ padding: 0, marginRight: '10px' }}>
                <img src={Logo} alt="Logo" style={{ maxHeight: '100px', maxWidth: 'auto' }} />
              </a>
              <h1 className="title" style={{ color: 'green', fontSize: '2rem', margin: 0  }}>
                PARKING<span style={{ color: 'white' }}>BOX</span>
              </h1>
            </div>
            <div className="column has-text-right">
              <button className="button is-success" onClick={handleLoginRedirect}>
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered mt-3">
            <div className="column is-10">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="3000"
              >
                <div
                  className="carousel-inner"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="carousel-item active fade-carousel-item">
                    <img
                      src="/parking_image1.jpg"
                      className="d-block w-100"
                      alt="Parking 1"
                      style={{ height: '500px', objectFit: 'cover' }}
                    />
                    <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                      <h2 style={{ color: 'black', fontSize: '3rem', fontFamily: 'Arial' , fontWeight: 'bold' }}>
                        PARKINGBOX Seguridad y Calidad
                      </h2>
                      <div style={{ position: 'absolute', bottom: '20px' }}>
                        <h5 style={{ color: 'white', fontWeight: 'bold',fontSize: '20px' }}>Gestión de Usuarios</h5>
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                          Administra la información de los usuarios que utilizan el sistema.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item fade-carousel-item">
                    <img
                      src="/parking_image2.jpg"
                      className="d-block w-100"
                      alt="Parking 2"
                      style={{ height: '500px', objectFit: 'cover' }}
                    />
                    <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                      <h2 style={{ color: 'black', fontSize: '3rem', fontFamily: 'Arial' , fontWeight: 'bold'}}>
                        PARKINGBOX Seguridad y Calidad
                      </h2>
                      <div style={{ position: 'absolute', bottom: '20px' }}>
                        <h5 style={{ color: 'white', fontWeight: 'bold',fontSize: '20px' }}>Gestión de Bahías</h5>
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                          Controla y supervisa los espacios de estacionamiento disponibles.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item fade-carousel-item">
                    <img
                      src="/parking_image3.jpg"
                      className="d-block w-100"
                      alt="Parking 3"
                      style={{ height: '500px', objectFit: 'cover' }}
                    />
                    <div className="carousel-caption d-flex h-100 align-items-center justify-content-center flex-column">
                      <h2 style={{ color: 'black', fontSize: '3rem', fontFamily: 'Arial' , fontWeight: 'bold' }}>
                        PARKINGBOX Seguridad y Calidad
                      </h2>
                      <div style={{ position: 'absolute', bottom: '20px' }}>
                        <h5 style={{ color: 'white', fontWeight: 'bold',fontSize: '20px' }}>Gestión de Vehículos</h5>
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                          Registra y monitorea los vehículos que ingresan y salen del
                          estacionamiento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Anterior</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                >
                  <span className="sr-only">Siguiente</span>
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
              </div>
              <div className="content mt-5">
              <p className="has-text-centered" style={{ color: 'black', fontWeight: 'bold', fontSize: '21px' }}>
                  PARKINGBOX es un sistema de gestión de estacionamientos que garantiza la seguridad
                  y eficiencia en la administración de tu parqueadero. Con funcionalidades avanzadas
                  y una interfaz intuitiva, ParkingBox es la solución ideal para mantener tu
                  estacionamiento organizado y seguro.
                </p>
                <p className="has-text-centered" style={{ color: 'black', fontWeight: 'bold', fontSize: '21px' }}>
                 PARKINGBOX es un sistema de gestión de estacionamientos que garantiza la seguridad
                 y eficiencia en la administración de tu parqueadero. Con funcionalidades avanzadas
                 y una interfaz intuitiva, ParkingBox es la solución ideal para mantener tu
                  estacionamiento organizado y seguro.
                </p>
                <p className="has-text-centered" style={{ color: 'black', fontWeight: 'bold', fontSize: '21px' }}>
                Nuestro sistema ofrece una variedad de características como monitoreo en tiempo
                real, reportes detallados y gestión automatizada de pagos. Con ParkingBox, puedes
                estar seguro de que tu parqueadero está en las mejores manos.
                </p>
                <p className="has-text-centered" style={{ color: 'black', fontWeight: 'bold', fontSize: '21px' }}>
                 Además, nuestro equipo de soporte está disponible las 24 horas del día para
                 asistirte con cualquier problema que puedas tener. ¡Únete a los muchos clientes
                 satisfechos que ya han hecho de ParkingBox su elección de confianza para la
                 gestión de estacionamientos!
                </p>
                <ul
                className="has-text-centered"
                style={{ listStyleType: 'none', padding: 0, color: 'black', fontWeight: 'bold', fontSize: '21px' }}
                >
                 <li>• Gestión de usuarios</li>
                 <li>• Gestión de bahías</li>
                 <li>• Gestión de vehículos</li>
                 <li>• Gestión de pagos</li>
                 <li>• Gestión de tarifas</li>
                 <li>• Generación de reportes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
