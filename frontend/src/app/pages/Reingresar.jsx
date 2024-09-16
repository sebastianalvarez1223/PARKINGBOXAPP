import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import FormReingresarVehiculo from '../components/FormReingresarVehiculo';

const Reingresar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
    const [vehiculo, setVehiculo] = useState(null);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    const handleLoadVehiculo = () => {
        // Simulación de datos del vehículo
        const vehiculoSimulado = {
            uuid: '12345',
            placa: 'ABC-123',
            nombreDueño: 'Juan Pérez',
            TiempoIngreso: '2024-08-21T10:00:00Z',
            categoria: { id: 1, tarifa: 100 },
            areaBahia: 2,
            status: 0
        };
        setVehiculo(vehiculoSimulado);
    };

    return (
        <div className="container">
            <h1 className="title">Reingresar Vehículo</h1>
            <button className="button is-primary" onClick={handleLoadVehiculo}>
                Cargar Vehículo
            </button>
            {vehiculo && (
                <FormReingresarVehiculo
                    isOpen={true}
                    onClose={() => setVehiculo(null)}
                    vehiculo={vehiculo}
                    onVehiculoUpdated={() => {
                        console.log('Vehículo reingresado');
                    }}
                />
            )}
        </div>
    );
};

export default Reingresar;
