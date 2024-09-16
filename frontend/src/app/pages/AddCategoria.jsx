import React, { useEffect, useState } from 'react';
import FormAddCategoria from '../components/FormAddCategoria';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddCategoria = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

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

    const [categorias, setCategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoriaAdded = (newCategoria) => {
        setCategorias([...categorias, newCategoria]); // Agrega la nueva categoría a la lista de categorías
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Agregar Categoría</button>
            <FormAddCategoria isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCategoriaAdded={handleCategoriaAdded} />
            {/* Renderiza la lista de categorías aquí */}
        </div>
    );
};

export default AddCategoria;
