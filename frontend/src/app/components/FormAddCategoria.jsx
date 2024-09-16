import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormAddCategoria = ({ isOpen, onClose, onCategoriaAdded }) => {
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [tarifa, setTarifa] = useState(""); // Cambiar de descripcion a tarifa

    const saveCategoria = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/categorias', {
                nombreCategoria,
                tarifa, // Cambiar descripcion a tarifa
            }, { withCredentials: true });

            Swal.fire({
                icon: 'success',
                title: 'Categoría añadida con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpia los campos del formulario
            setNombreCategoria("");
            setTarifa("");

            onCategoriaAdded();
            onClose();
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error al añadir la categoría',
                text: error.response ? error.response.data.message : 'Error desconocido'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Agregar Categoría</p>
                    <button className="delete" onClick={onClose}></button>
                </header>
                <form onSubmit={saveCategoria}>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Nombre de la Categoría</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={nombreCategoria}
                                    onChange={(e) => setNombreCategoria(e.target.value)}
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
                                />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className="button is-success">Guardar</button>
                        <button type="button" className="button" onClick={onClose}>Cancelar</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default FormAddCategoria;
