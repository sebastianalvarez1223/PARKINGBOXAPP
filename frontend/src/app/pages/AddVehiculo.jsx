import React, { useEffect } from 'react';
import Layout from './Layout';
import FormAddVehiculo from '../components/FormAddVehiculo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddVehiculo = () => {
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
    }, [isError, navigate]);

    // Si el usuario no está autenticado, redirige al inicio
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <Layout>
            <FormAddVehiculo />
        </Layout>
    );
};

export default AddVehiculo;
