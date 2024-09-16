import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditAreaParqueo from "../components/FormEditAreaParqueo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditAreaParqueo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);

    const handleUpdate = () => {
        // Aquí puedes manejar lo que necesitas hacer después de actualizar el área de parqueo
        console.log("Área de parqueo actualizada");
    };

    return (
        <Layout>
            <FormEditAreaParqueo areaParqueoId={id} onUpdate={handleUpdate} onClose={() => navigate("/areasparqueo")} />
        </Layout>
    );
};

export default EditAreaParqueo;
