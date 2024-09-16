import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import FormEditCategoria from '../components/FormEditCategoria';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from 'axios'; // Asegúrate de importar axios

const EditCategoria = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);
    const [isModalOpen, setModalOpen] = useState(false);
    const [categoria, setCategoria] = useState(null);
    const { id } = useParams(); // Obtener el ID de la categoría de los parámetros de la URL

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
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categorias/${id}`);
                setCategoria(response.data);
            } catch (error) {
                console.error("Error fetching categoria:", error);
            }
        };

        fetchCategoria();
    }, [id]);

    const handleUpdate = () => {
        // Logic to refresh the categoria list after an update
    };

    return (
        <Layout>
            {categoria && (
                <>
                    <button className="button is-info" onClick={() => setModalOpen(true)}>Editar Categoría</button>
                    {isModalOpen && (
                        <FormEditCategoria
                            categoria={categoria}
                            onClose={() => setModalOpen(false)}
                            onUpdate={handleUpdate}
                        />
                    )}
                </>
            )}
        </Layout>
    );
};

export default EditCategoria;
