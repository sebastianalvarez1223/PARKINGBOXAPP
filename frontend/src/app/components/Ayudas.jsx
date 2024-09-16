import React from 'react';
import { IoHome, IoCar, IoCalendar, IoMap, IoPerson } from 'react-icons/io5';

const Ayudas = () => {
    const ayudas = [
        {
            nombre: "Modulo de Inicio Sesión",
            link: "https://youtu.be/m7DIh9sASRw",
            icono: <IoHome />,
        },
        {
            nombre: "Modulo de Vehículos",
            link: "https://youtu.be/T7RwOzCdlJI",
            icono: <IoCar />,
        },
        {
            nombre: "Modulo de Categorías",
            link: "https://youtu.be/eJgGDnhZBqk",
            icono: <IoCalendar />,
        },
        {
            nombre: "Modulo de Área Parqueo",
            link: "https://youtu.be/JWLuLkREv08",
            icono: <IoMap />,
        },
        {
            nombre: "Modulo de Usuarios",
            link: "https://youtu.be/rmkcC4r6W0I",
            icono: <IoPerson />,
            className: "is-offset-4",  // Clase para mover esta columna hacia el centro
        },
    ];

    return (
        <div>
            <h1 className="title" >Ayudas</h1>
            <h2 className='subtitle'>Lista de Videos Manual de Usuario</h2>
            <div className="columns is-multiline">
                {ayudas.map((ayuda, index) => (
                    <div 
                        key={index} 
                        className={`column is-one-quarter ${ayuda.className || ''}`} // Agregar clase si existe
                    >
                        <div className="box has-background-info">
                            <div className="has-text-centered">
                                <span className="icon is-large">{ayuda.icono}</span>
                                <h3 className="subtitle">{ayuda.nombre}</h3>
                                <a 
                                    href={ayuda.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="button is-info"
                                >
                                    Ver Video
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ayudas;
