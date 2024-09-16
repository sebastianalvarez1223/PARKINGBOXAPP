import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormEditVehiculo = ({ isOpen, onClose, vehiculo, onVehiculoUpdated }) => {
    const [categoriaId, setCategoriaId] = useState("");
    const [areaBahia, setAreaBahia] = useState("");
    const [marca, setMarca] = useState("");
    const [placa, setPlaca] = useState("");
    const [nombreDueño, setNombreDueño] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (vehiculo) {
            setCategoriaId(vehiculo.categoriaId || "");
            setAreaBahia(vehiculo.areaBahia || "");
            setMarca(vehiculo.marca || "");
            setPlaca(vehiculo.placa || "");
            setNombreDueño(vehiculo.nombreDueño || "");
            setDescripcion(vehiculo.descripcion || "");
        }
    }, [vehiculo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.patch(`http://localhost:5000/vehiculos/${vehiculo.uuid}`, {
                categoriaId,
                areaBahia,
                marca,
                placa,
                nombreDueño,
                descripcion,
            });
            Swal.fire({
                icon: 'success',
                title: 'Vehículo actualizado con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            onVehiculoUpdated();
            onClose();  // Cerrar el modal después de actualizar
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg || "Error al actualizar el vehículo");
            } else {
                setMsg("Error al conectar con el servidor");
            }
        }
    };

    if (!isOpen || !vehiculo) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Actualizar Vehículo</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Categoría</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Categoría"
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Área/Bahía</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Área/Bahía"
                                    value={areaBahia}
                                    onChange={(e) => setAreaBahia(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Marca</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Marca"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Placa</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Placa"
                                    value={placa}
                                    onChange={(e) => setPlaca(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre Dueño</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nombre del Dueño"
                                    value={nombreDueño}
                                    onChange={(e) => setNombreDueño(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Descripción</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Descripción"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="field is-grouped">
                            <p className="control">
                                <button type="submit" className="button is-primary">Actualizar</button>
                            </p>
                            <p className="control">
                                <button type="button" className="button" onClick={onClose}>Cancelar</button>
                            </p>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default FormEditVehiculo;
