import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddAreaParqueo from "../components/FormAddAreaParqueo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddAreaParqueo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <FormAddAreaParqueo />
        </Layout>
    );
};

export default AddAreaParqueo;
