import React, { useEffect, useState } from 'react';

import FormAddUser from '../components/FormAddUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const GuardarUser = () => {
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

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]); // Agrega el nuevo usuario a la lista de usuarios
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Agregar Usuario</button>
            <FormAddUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUserAdded={handleUserAdded} />
            {/* Renderiza la lista de usuarios aquí */}
        </div>
    );
};

export default GuardarUser;
