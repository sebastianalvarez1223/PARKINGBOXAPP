import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import printJS from 'print-js';

const FormAddVehiculo = ({ isOpen, onClose, onVehiculoAdded }) => {
    const [marca, setMarca] = useState("");
    const [placa, setPlaca] = useState("");
    const [nombreDueño, setNombreDueño] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [areaBahia, setAreaBahia] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [areasParqueo, setAreasParqueo] = useState([]);

    useEffect(() => {
        getCategorias();
        getAreasParqueo();
    }, []);

    const getCategorias = async () => {
        try {
            const response = await axios.get("http://localhost:5000/categorias");
            console.log('Categorias:', response.data); // Depuración
            setCategorias(response.data.categorias);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getAreasParqueo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/areasParqueo");
            console.log('Áreas de parqueo:', response.data); // Depuración
            setAreasParqueo(response.data.areasParqueo);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };

    const saveVehiculo = async (e) => {
        e.preventDefault();
        try {
            // Se elimina la asignación de la respuesta
            await axios.post('http://localhost:5000/vehiculos', {
                marca,
                placa,
                nombreDueño,
                descripcion,
                categoriaId: parseInt(categoriaId, 10), // Convertir a número entero
                areaBahia: parseInt(areaBahia, 10), // Convertir a número entero
            }, { withCredentials: true }); // Incluir credenciales para la sesión

            Swal.fire({
                icon: 'success',
                title: 'Vehículo añadido con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            // Generar el contenido del ticket para imprimir
            const vehiculoData = `
                <h1>Ticket de Vehículo</h1>
                <p><strong>Marca:</strong> ${marca}</p>
                <p><strong>Placa:</strong> ${placa}</p>
                <p><strong>Nombre del Dueño:</strong> ${nombreDueño}</p>
                <p><strong>Descripción:</strong> ${descripcion}</p>
                <p><strong>Categoría:</strong> ${categorias.find(cat => cat.id === parseInt(categoriaId, 10))?.nombreCategoria || ''}</p>
                <p><strong>Área/Bahía:</strong> ${areasParqueo.find(area => area.id === parseInt(areaBahia, 10))?.ubicacion || ''}</p>
                <p><strong>Tiempo de Ingreso:</strong> ${new Date().toLocaleString()}</p>
            `;

            // Usar Print.js para imprimir
            printJS({
                printable: vehiculoData,
                type: 'raw-html',
                style: `
                    h1 { font-size: 18px; }
                    p { font-size: 14px; }
                    strong { font-weight: bold; }
                `,
            });

            // Limpiar los campos
            setMarca("");
            setPlaca("");
            setNombreDueño("");
            setDescripcion("");
            setCategoriaId("");
            setAreaBahia("");

            onVehiculoAdded();
            onClose();
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message); // Mostrar detalles del error
            Swal.fire({
                icon: 'error',
                title: 'Error al añadir el vehículo',
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
                    <p className="modal-card-title">Agregar Vehículo</p>
                    <button className="delete" onClick={onClose}></button>
                </header>
                <form onSubmit={saveVehiculo}>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Marca</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Placa</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={placa}
                                    onChange={(e) => setPlaca(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Nombre del Dueño</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={nombreDueño}
                                    onChange={(e) => setNombreDueño(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Descripción</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Categoría</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        value={categoriaId}
                                        onChange={(e) => setCategoriaId(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar Categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombreCategoria}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Área/Bahía</label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        value={areaBahia}
                                        onChange={(e) => setAreaBahia(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar Área/Bahía</option>
                                        {areasParqueo.map((area) => (
                                            <option key={area.id} value={area.id}>
                                                {area.ubicacion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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

export default FormAddVehiculo;
