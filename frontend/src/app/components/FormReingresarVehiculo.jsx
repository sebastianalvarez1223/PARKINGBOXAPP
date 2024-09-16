import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import printJS from 'print-js'; // Importa el módulo print-js

const FormReingresarVehiculo = ({ isOpen, onClose, vehiculo, onVehiculoUpdated }) => {
    const [nombreDueño, setNombreDueño] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (vehiculo) {
            setNombreDueño(vehiculo.nombreDueño || "");
        }
    }, [vehiculo]);

    const handleReIngreso = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:5000/vehiculos/${vehiculo.uuid}/reingresarVehiculo`, {
                nombreDueño
            });

            // Mostrar mensaje de éxito con los detalles del vehículo reingresado
            Swal.fire({
                icon: 'success',
                title: 'Vehículo reingresado con éxito',
                html: `
                    <p><strong>Placa:</strong> ${response.data.data.placa}</p>
                    <p><strong>Nombre Dueño:</strong> ${response.data.data.nombreDueño}</p>
                    <p><strong>Marca:</strong> ${response.data.data.marca}</p>
                    <p><strong>Área de Bahía:</strong> ${response.data.data.areaBahia}</p>
                    <p><strong>Categoría:</strong> ${response.data.data.categoriaId}</p>
                    <p><strong>Descripción:</strong> ${response.data.data.descripcion || 'N/A'}</p>
                    <p><strong>Tiempo de Ingreso:</strong> ${new Date(response.data.data.TiempoIngreso).toLocaleString()}</p>
                `,
                showConfirmButton: true
            }).then(() => {
                // Generar la impresión después de que el usuario haya visto el mensaje de éxito
                printVehicleDetails(response.data.data);

                // Retornar a la lista de vehículos y refrescar la página después de imprimir
                setTimeout(() => {
                    if (typeof onVehiculoUpdated === 'function') {
                        onVehiculoUpdated(); // Asegúrate de que onVehiculoUpdated es una función
                    }
                    onClose();
                    window.location.reload(); // Recargar la página
                }, 1000); // Esperar 1 segundo para asegurar que la impresión se haya iniciado

            });

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message || "Error al reingresar el vehículo");
            } else {
                setMsg("Error al conectar con el servidor");
            }
        }
    };

    const printVehicleDetails = (vehicle) => {
        // Generar el contenido del ticket para imprimir
        const vehiculoData = `
            <h1>Ticket de Reingreso de Vehículo</h1>
            <p><strong>Placa:</strong> ${vehicle.placa}</p>
            <p><strong>Nombre Dueño:</strong> ${vehicle.nombreDueño}</p>
            <p><strong>Marca:</strong> ${vehicle.marca}</p>
            <p><strong>Área de Bahía:</strong> ${vehicle.areaBahia}</p>
            <p><strong>Categoría:</strong> ${vehicle.categoriaId}</p>
            <p><strong>Descripción:</strong> ${vehicle.descripcion || 'N/A'}</p>
            <p><strong>Tiempo de Ingreso:</strong> ${new Date(vehicle.TiempoIngreso).toLocaleString()}</p>
        `;

        // Usar Print.js para imprimir
        printJS({
            printable: vehiculoData,
            type: 'raw-html',
            style: `
                h1 { font-size: 18px; text-align: center; }
                p { font-size: 14px; }
                strong { font-weight: bold; }
            `,
        });
    };

    if (!isOpen || !vehiculo) {
        return null;
    }

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Reingresar Vehículo</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
                    <form onSubmit={handleReIngreso}>
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

                        <div className="field is-grouped">
                            <p className="control">
                                <button type="submit" className="button is-primary">Ingresar De Nuevo</button>
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

export default FormReingresarVehiculo;
