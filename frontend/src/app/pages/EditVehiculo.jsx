import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import FormEditVehiculo from '../components/FormEditVehiculo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios';

const EditVehiculo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [isModalOpen, setModalOpen] = useState(false);
    const [vehiculo, setVehiculo] = useState(null);
    const { id } = useParams(); // Obtener el ID del vehículo de los parámetros de la URL

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.role !== "admin") {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    useEffect(() => {
        const fetchVehiculo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/vehiculos/${id}`);
                setVehiculo(response.data);
            } catch (error) {
                console.error("Error fetching vehiculo:", error);
            }
        };

        fetchVehiculo();
    }, [id]);

    const handleUpdate = () => {
        // Lógica para actualizar la lista de vehículos después de una actualización
    };

    return (
        <Layout>
            {vehiculo && (
                <>
                    <button className="button is-info" onClick={() => setModalOpen(true)}>Editar Vehículo</button>
                    {isModalOpen && (
                        <FormEditVehiculo
                            vehiculo={vehiculo}
                            onClose={() => setModalOpen(false)}
                            onUpdate={handleUpdate}
                        />
                    )}
                </>
            )}
        </Layout>
    );
};

export default EditVehiculo;
