import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import FormCotizarVehiculo from '../components/FormCotizarVehiculo';

const Cotizar = () => {
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
            <h1 className="title">Cotizar Vehículo</h1>
            <button className="button is-primary" onClick={handleLoadVehiculo}>
                Cargar Vehículo
            </button>
            {vehiculo && (
                <FormCotizarVehiculo
                    isOpen={true}
                    onClose={() => setVehiculo(null)}
                    vehiculo={vehiculo}
                    onVehiculoUpdated={() => {
                        // Acciones a realizar después de que el vehículo ha sido actualizado
                        console.log('Vehículo actualizado');
                    }}
                />
            )}
        </div>
    );
};

export default Cotizar;
