import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import FormAddAreaParqueo from "./FormAddAreaParqueo";
import FormEditAreaParqueo from "./FormEditAreaParqueo";
import {  IoPencil, IoTrash } from 'react-icons/io5';

const AreaParqueolist = ({ userRole }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [areasParqueo, setAreasParqueo] = useState([]);
    const [selectedAreaParqueo, setSelectedAreaParqueo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const areasParqueoPerPage = 10;

    useEffect(() => {
        getAreasParqueo();
    }, []);

    const getAreasParqueo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/areasparqueo');
            setAreasParqueo(response.data.areasParqueo);
        } catch (error) {
            console.error("Error fetching areas de parqueo:", error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = async (areaParqueoId) => {
        try {
            const response = await axios.get(`http://localhost:5000/areasparqueo/${areaParqueoId}`);
            setSelectedAreaParqueo(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Error fetching area de parqueo data:", error);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAreaParqueo(null);
    };

    const handleAreaParqueoAdded = () => {
        getAreasParqueo();
        closeAddModal();
    };

    const handleAreaParqueoUpdated = () => {
        getAreasParqueo();
        closeEditModal();
    };

    const deleteAreaParqueo = async (areaParqueoId) => {
        try {
            await axios.delete(`http://localhost:5000/areasparqueo/${areaParqueoId}`);
            getAreasParqueo();
            Swal.fire({
                icon: 'success',
                title: 'Área de Parqueo eliminada con éxito',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el área de parqueo',
                text: error.response ? error.response.data.msg : 'Error desconocido'
            });
        }
    };

    const handleDeleteClick = (areaParqueoId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAreaParqueo(areaParqueoId);
            }
        });
    };

    const filteredAreasParqueo = areasParqueo.filter(areaParqueo => 
        areaParqueo.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        areaParqueo.categoriaNamebh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof areaParqueo.categoriaId === 'string' && areaParqueo.categoriaId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof areaParqueo.capacidadArea === 'number' && areaParqueo.capacidadArea.toString().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastAreaParqueo = currentPage * areasParqueoPerPage;
    const indexOfFirstAreaParqueo = indexOfLastAreaParqueo - areasParqueoPerPage;
    const currentAreasParqueo = filteredAreasParqueo.slice(indexOfFirstAreaParqueo, indexOfLastAreaParqueo);

    const totalPages = Math.ceil(filteredAreasParqueo.length / areasParqueoPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className='title'>Áreas de Parqueo</h1>
                {userRole === 'admin' && (
                    <button
                        onClick={openAddModal}
                        className="button is-primary mb-2"
                        style={{ backgroundColor: '#8bb48b', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }}
                    >
                        Agregar Nueva
                    </button>
                )}
            </div>
            <h2 className='subtitle'>Lista de Áreas de Parqueo</h2>
            <FormAddAreaParqueo
                isOpen={isAddModalOpen}
                onClose={closeAddModal}
                onAreaParqueoAdded={handleAreaParqueoAdded}
            />

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
                        <th>Nombre</th>
                        <th>Ubicación</th>
                        <th>Capacidad</th>
                        <th>Categoria</th>
                        {userRole === 'admin' && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentAreasParqueo.map((areaParqueo, index) => (
                        <tr key={areaParqueo.id}>
                            <td>{indexOfFirstAreaParqueo + index + 1}</td>
                            <td>{areaParqueo.categoriaNamebh}</td>
                            <td>{areaParqueo.ubicacion}</td>
                            <td>{areaParqueo.capacidadArea}</td>
                            <td>{areaParqueo.categoriaId}</td>
                            {userRole === 'admin' && (
                                <td>
                                    <button
                                        onClick={() => openEditModal(areaParqueo.id)}
                                        className="button is-small is-info"
                                    >
                                        <IoPencil />Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(areaParqueo.id)}
                                        className="button is-small is-danger"
                                    >
                                        <IoTrash />Eliminar
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <p>
                    Mostrando {indexOfFirstAreaParqueo + 1} a {Math.min(indexOfLastAreaParqueo, filteredAreasParqueo.length)} de {filteredAreasParqueo.length} entradas
                </p>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ backgroundColor: '#8bb48b', color: '#fff', borderRadius: '5px', padding: '5px 10px' }}
                    >
                        Anterior
                    </button>
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                            className={number + 1 === currentPage ? 'active' : ''}
                            style={{ backgroundColor: number + 1 === currentPage ? '#8bb48b' : '#fff', color: number + 1 === currentPage ? '#fff' : '#8bb48b', borderRadius: '5px', padding: '5px 10px', border: '1px solid #8bb48b' }}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ backgroundColor: '#8bb48b', color: '#fff', borderRadius: '5px', padding: '5px 10px' }}
                    >
                        Próximo
                    </button>
                </div>
            </div>

            {isEditModalOpen && selectedAreaParqueo && (
                <FormEditAreaParqueo
                    areaParqueo={selectedAreaParqueo}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    onAreaParqueoUpdated={handleAreaParqueoUpdated}
                />
            )}
        </div>
    );
};

export default AreaParqueolist;
