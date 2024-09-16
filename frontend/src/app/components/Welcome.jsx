import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoLogOut, IoCar, IoCalendar, IoMap } from "react-icons/io5";

const Welcome = () => {
    const { user } = useSelector((state) => state.auth);
    const [vehiculosIngresaron, setVehiculosIngresaron] = useState(0);
    const [vehiculosSalieron, setVehiculosSalieron] = useState(0);
    const [categorias, setCategorias] = useState(0);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Obtener la cantidad de vehículos que ingresaron (estado 0) y salieron (estado 1)
        const fetchVehiculos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/vehiculos'); // Ajusta la ruta según tu configuración
                console.log('Vehiculos:', response.data);  // Log para verificar la respuesta
                const vehiculos = response.data;

                const ingresaron = vehiculos.filter(v => v.status === false).length;
                const salieron = vehiculos.filter(v => v.status === true).length;

                setVehiculosIngresaron(ingresaron);
                setVehiculosSalieron(salieron);
            } catch (error) {
                console.error('Error al obtener los vehículos:', error);
            }
        };

        // Obtener la cantidad de categorías
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categorias'); // Ajusta la ruta según tu configuración
                console.log('Categorias:', response.data);  // Log para verificar la respuesta
                // Ajusta esto según el formato real de tu respuesta API
                setCategorias(response.data.count || response.data.length || 0);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        // Obtener las áreas de parqueo y la capacidad disponible
        const fetchAreas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/areasParqueo'); // Ajusta la ruta según tu configuración
                console.log('Areas:', response.data);  // Log para verificar la respuesta
                setAreas(response.data.areasParqueo || response.data); // Ajusta según el formato real
            } catch (error) {
                console.error('Error al obtener las áreas de parqueo:', error);
            }
        };

        fetchVehiculos();
        fetchCategorias();
        fetchAreas();
    }, []);

    return (
        <div>
            <h1 className='title'>Reporte en vivo</h1>
            <h2 className='subtitle'>
                Bienvenido de nuevo <strong>{user && user.name}</strong> al estacionamiento Calle 109
            </h2>
            
            <div className="columns is-multiline">
                <div className="column is-one-quarter">
                    <div className="box has-background-dark has-text-white"><IoCar />
                        <h3>Ingresaron</h3>
                        <p>{vehiculosIngresaron}</p>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <div className="box has-background-dark has-text-white" ><IoLogOut />
                        <h3>Salieron</h3>
                        <p>{vehiculosSalieron}</p>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <div className="box has-background-dark has-text-white"><IoCalendar />
                        <h3>Categorías</h3>
                        <p>{categorias}</p>
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <div className="box has-background-dark has-text-white"><IoMap />
                        <h3>Áreas</h3>
                        <p>{areas.length}</p>
                    </div>
                </div>
            </div>

            <div className="box has-background-success">
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Libres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areas.map((area, index) => (
                            <tr key={index}>
                                <td>{area.ubicacion || area.ubicacion || 'Ubicacion Desconocido'}</td>
                                <td>{area.capacidadArea || area.capacidadArea || 'Desconocido'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Welcome;
