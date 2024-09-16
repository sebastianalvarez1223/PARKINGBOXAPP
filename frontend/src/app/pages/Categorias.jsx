import React, { useEffect } from "react";
import Layout from "./Layout";
import Categorialist from "../components/Categorialist.jsx"; // Asegúrate de que este componente esté exportado correctamente
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Categorias = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Manejar redirección si hay un error
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Categorialist userRole={user ? user.role : ''} />
    </Layout>
  );
};

export default Categorias;
