import React, { useEffect } from "react";
import Layout from "./Layout";
import AreaParqueolist from "../components/AreaParqueolist.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AreaParqueo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

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
            <AreaParqueolist userRole={user?.role} />
        </Layout>
    );
};

export default AreaParqueo;
