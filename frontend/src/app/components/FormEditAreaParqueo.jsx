import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormEditAreaParqueo = ({ areaParqueo, onClose, onUpdate }) => {
    const [categoriaNamebh, setCategoriaNamebh] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [capacidadArea, setCapacidadArea] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [msg, setMsg] = useState("");  // Se usará para mostrar mensajes de error

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:5000/categorias");
                setCategorias(response.data.categorias);
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

    useEffect(() => {
        if (areaParqueo) {
            setCategoriaNamebh(areaParqueo.categoriaNamebh || "");
            setCategoriaId(areaParqueo.categoriaId || "");
            setUbicacion(areaParqueo.ubicacion || "");
            setCapacidadArea(areaParqueo.capacidadArea || "");
        }
    }, [areaParqueo]);

    const updateAreaParqueo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/areasparqueo/${areaParqueo.id}`, {
                categoriaNamebh,
                categoriaId,
                ubicacion,
                capacidadArea
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: "El area parqueo se Actualizo correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    if (onUpdate) onUpdate();  // Verifica si onUpdate existe antes de llamarlo
                    onClose();  // Cerrar el modal
                    window.location.reload();  // Recargar la página
                });
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            const errorMsg = error.response ? error.response.data.msg : error.message;
            setMsg(errorMsg);  // Guardar el mensaje de error en el estado
        }
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Actualizar Área de Parqueo</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <form onSubmit={updateAreaParqueo}>
                    <section className="modal-card-body">
                        {msg && <p className="has-text-centered has-text-danger">{msg}</p>}  {/* Mostrar mensaje de error */}
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
                        <button type="submit" className="button is-primary">Actualizar</button>
                        <button type="button" className="button" onClick={onClose}>Cancelar</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default FormEditAreaParqueo;
