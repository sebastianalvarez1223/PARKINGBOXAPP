import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state => state.auth));
    const [isModalOpen, setModalOpen] = useState(false);

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

    const handleUpdate = () => {
        // Logic to refresh the user list after an update
    };

    return (
        <Layout>
            <button className="button is-info" onClick={() => setModalOpen(true)}>Edit User</button>
            {isModalOpen && (
                <FormEditUser
                    onClose={() => setModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </Layout>
    );
}

export default EditUser;
