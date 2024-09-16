import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { IoCheckbox, IoReload, IoPencil, IoTrash } from "react-icons/io5";
import FormAddVehiculo from "./FormAddVehiculo";
import FormEditVehiculo from "./FormEditVehiculo";
import FormCotizarVehiculo from "./FormCotizarVehiculo";
import FormReingresarVehiculo from "./FormReingresarVehiculo";

const VehiculoList = ({ userRole }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCotizarModalOpen, setIsCotizarModalOpen] = useState(false);
    const [isReingresarModalOpen, setIsReingresarModalOpen] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const vehiculosPerPage = 10;

    useEffect(() => {
        getVehiculos();
    }, []);

    const getVehiculos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/vehiculos');
            setVehiculos(response.data);
        } catch (error) {
            console.error("Error fetching vehiculos:", error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = async (vehiculoId) => {
        try {
            const response = await axios.get(`http://localhost:5000/vehiculos/${vehiculoId}`);
            setSelectedVehiculo(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Error fetching vehiculo data:", error);
            setSelectedVehiculo(null);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedVehiculo(null);
    };

    const openCotizarModal = (vehiculo) => {
        setSelectedVehiculo(vehiculo);
        setIsCotizarModalOpen(true);
    };

    const closeCotizarModal = () => {
        setIsCotizarModalOpen(false);
        setSelectedVehiculo(null);
    };

    const openReingresarModal = (vehiculo) => {
        setSelectedVehiculo(vehiculo);
        setIsReingresarModalOpen(true);
    };

    const closeReingresarModal = () => {
        setIsReingresarModalOpen(false);
        setSelectedVehiculo(null);
    };

    const handleVehiculoAdded = () => {
        getVehiculos();
        closeAddModal();
    };

    const handleVehiculoUpdated = () => {
        getVehiculos();
        closeEditModal();
    };

    const handleCotizacionFinalizada = () => {
        getVehiculos();
        closeCotizarModal();
    };

    const handleReingresoFinalizado = () => {
        getVehiculos(); // Actualiza la lista de vehículos
        closeReingresarModal(); // Cierra el modal
    };

    const deleteVehiculo = async (vehiculoId) => {
        try {
            await axios.delete(`http://localhost:5000/vehiculos/${vehiculoId}`);
            getVehiculos();
            Swal.fire({
                icon: 'success',
                title: 'Vehículo eliminado con éxito',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el vehículo',
                text: error.response ? error.response.data.msg : 'Error desconocido'
            });
        }
    };

    const handleDeleteClick = (vehiculoId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVehiculo(vehiculoId);
            }
        });
    };

    const filteredVehiculos = vehiculos.filter(vehiculo =>
        String(vehiculo.marca).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.placa).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.descripcion).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.user ? vehiculo.user.name : 'Desconocido').toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.nombreDueño).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.categoriaId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(vehiculo.areaBahia).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastVehiculo = currentPage * vehiculosPerPage;
    const indexOfFirstVehiculo = indexOfLastVehiculo - vehiculosPerPage;
    const currentVehiculos = filteredVehiculos.slice(indexOfFirstVehiculo, indexOfLastVehiculo);

    const totalPages = Math.ceil(filteredVehiculos.length / vehiculosPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className='title'>Vehículos</h1>
                <button onClick={openAddModal} className="button is-primary mb-2" style={{ backgroundColor: '#8bb48b', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }}>
                    Agregar Nuevo
                </button>
            </div>
            <h2 className='subtitle'>Lista de Vehículos</h2>
            <FormAddVehiculo isOpen={isAddModalOpen} onClose={closeAddModal} onVehiculoAdded={handleVehiculoAdded} />

            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Categoría</th>
                        <th>Área/Bahía</th>
                        <th>Marca</th>
                        <th>Placa</th>
                        <th>Nombre Dueño</th>
                        <th>Descripción</th>
                        <th>Creado por</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVehiculos.map((vehiculo, index) => (
                        
                        <tr key={vehiculo.uuid}>
                            <td>{indexOfFirstVehiculo + index + 1}</td>
                            <td>{vehiculo.categoriaId}</td>
                            <td>{vehiculo.areaBahia}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.nombreDueño}</td>
                            <td>{vehiculo.descripcion}</td>
                            <td>{vehiculo.user ? vehiculo.user.name : 'Desconocido'}</td>
                            <td>{vehiculo.status === false ? 'entrada' : 'salida' }</td>
                            <td>
                                <button onClick={() => openEditModal(vehiculo.uuid)} className="button is-small is-info">
                                <IoPencil />Editar
                                </button>
                                <button onClick={() => handleDeleteClick(vehiculo.uuid)} className="button is-small is-danger">
                                <IoTrash />Eliminar
                                </button>
                                <button onClick={() => openCotizarModal(vehiculo)} className="button is-small is-success">
                                    <IoCheckbox /> Cotizar
                                </button>
                                <button onClick={() => openReingresarModal(vehiculo)} className="button is-small is-warning">
                                    <IoReload /> Reingresar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <p>Mostrando {indexOfFirstVehiculo + 1} a {Math.min(indexOfLastVehiculo, filteredVehiculos.length)} de {filteredVehiculos.length} entradas</p>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} style={{ backgroundColor: '#8bb48b', color: '#fff', borderRadius: '5px', padding: '5px 10px' }}>
                        Anterior
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i + 1} onClick={() => paginate(i + 1)} style={{ backgroundColor: currentPage === i + 1 ? '#8bb48b' : '#f0f0f0', color: currentPage === i + 1 ? '#fff' : '#333', borderRadius: '5px', padding: '5px 10px' }}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} style={{ backgroundColor: '#8bb48b', color: '#fff', borderRadius: '5px', padding: '5px 10px' }}>
                        Siguiente
                    </button>
                </div>
            </div>
            <FormEditVehiculo isOpen={isEditModalOpen} onClose={closeEditModal} vehiculo={selectedVehiculo} onVehiculoUpdated={handleVehiculoUpdated} />
            <FormCotizarVehiculo isOpen={isCotizarModalOpen} onClose={closeCotizarModal} vehiculo={selectedVehiculo} onCotizacionFinalizada={handleCotizacionFinalizada} />
            <FormReingresarVehiculo isOpen={isReingresarModalOpen} onClose={closeReingresarModal} vehiculo={selectedVehiculo} onReingresoFinalizado={handleReingresoFinalizado} />
        </div>
    );
};

export default VehiculoList;
