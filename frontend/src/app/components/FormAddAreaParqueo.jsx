import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormAddAreaParqueo = ({ isOpen, onClose, onAreaParqueoAdded }) => {
    const [categoriaNamebh, setCategoriaNamebh] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidadArea, setCapacidadArea] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:5000/categorias");
                setCategorias(response.data.categorias); // Ajusta según la estructura de tu respuesta
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener las categorías',
                    text: error.response ? error.response.data.msg : 'Error desconocido'
                });
            }
        };

        fetchCategorias();
    }, []);

    const saveAreaParqueo = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/areasparqueo", {
                categoriaNamebh,
                categoriaId,
                ubicacion,
                capacidadArea
            });

            Swal.fire({
                icon: 'success',
                title: 'Área de Parqueo agregada con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpia los campos del formulario
            setCategoriaNamebh("");
            setCategoriaId("");
            setUbicacion("");
            setCapacidadArea("");

            onAreaParqueoAdded();
            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar el área de parqueo',
                text: error.response ? error.response.data.msg : 'Error desconocido'
            });
        }
    };

    return (
        isOpen && (
            <div className="modal is-active">
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Agregar Área de Parqueo</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <form onSubmit={saveAreaParqueo}>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Nombre de Categoría</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={categoriaNamebh}
                                        onChange={(e) => setCategoriaNamebh(e.target.value)}
                                        placeholder="Nombre de la categoría"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">ID de Categoría</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            value={categoriaId}
                                            onChange={(e) => setCategoriaId(e.target.value)}
                                            required
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.id} - {categoria.nombreCategoria}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Ubicación</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)}
                                        placeholder="Ubicación del área de parqueo"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Capacidad</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        className="input"
                                        value={capacidadArea}
                                        onChange={(e) => setCapacidadArea(e.target.value)}
                                        placeholder="Capacidad del área de parqueo"
                                        required
                                    />
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button type="submit" className="button is-primary">Guardar</button>
                            <button type="button" className="button" onClick={onClose}>Cancelar</button>
                        </footer>
                    </form>
                </div>
            </div>
        )
    );
};

export default FormAddAreaParqueo;
