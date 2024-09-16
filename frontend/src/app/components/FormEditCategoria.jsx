import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormEditCategoria = ({ categoria, onClose, onUpdate }) => {
    const [nombreCategoria, setNombreCategoria] = useState(categoria.nombreCategoria || "");
    const [tarifa, setTarifa] = useState(categoria.tarifa || ""); // Cambiar de descripcion a tarifa
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setNombreCategoria(categoria.nombreCategoria);
        setTarifa(categoria.tarifa); // Cambiar de descripcion a tarifa
    }, [categoria]);

    const updateCategoria = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/categorias/${categoria.id}`, {
                nombreCategoria,
                tarifa, // Cambiar descripcion a tarifa
            });
            Swal.fire({
                icon: 'success',
                title: 'Categoría actualizada con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            onUpdate();
            onClose();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Actualizar Categoría</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {msg && <p className="has-text-centered">{msg}</p>}
                    <form onSubmit={updateCategoria}>
                        <div className="field">
                            <label className="label">Nombre de la Categoría</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={nombreCategoria}
                                    onChange={(e) => setNombreCategoria(e.target.value)}
                                    placeholder='Nombre de la Categoría'
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Tarifa</label> {/* Cambiar de Descripción a Tarifa */}
                            <div className="control">
                                <input
                                    type="number" // Cambiar a number si es un valor numérico
                                    className="input"
                                    value={tarifa}
                                    onChange={(e) => setTarifa(e.target.value)}
                                    placeholder='Tarifa'
                                />
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success" onClick={updateCategoria}>Actualizar</button>
                    <button className="button" onClick={onClose}>Cancelar</button>
                </footer>
            </div>
        </div>
    );
};

export default FormEditCategoria;
