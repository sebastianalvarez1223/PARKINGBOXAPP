import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import FormAddCategoria from "./FormAddCategoria";
import FormEditCategoria from "./FormEditCategoria";
import {  IoPencil, IoTrash } from 'react-icons/io5';


const Categorialist = ({ userRole }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const categoriasPerPage = 10;

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categorias');
            setCategorias(response.data.categorias);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = async (categoriaId) => {
        try {
            const response = await axios.get(`http://localhost:5000/categorias/${categoriaId}`);
            setSelectedCategoria(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCategoria(null);
    };

    const handleCategoriaAdded = () => {
        getCategorias();
        closeAddModal();
    };

    const handleCategoriaUpdated = () => {
        getCategorias();
        closeEditModal();
    };

    const deleteCategoria = async (categoriaId) => {
        try {
            await axios.delete(`http://localhost:5000/categorias/${categoriaId}`);
            getCategorias();
            Swal.fire({
                icon: 'success',
                title: 'Categoría eliminada con éxito',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la categoría',
                text: error.response ? error.response.data.msg : 'Error desconocido'
            });
        }
    };

    const handleDeleteClick = (categoriaId) => {
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
                deleteCategoria(categoriaId);
            }
        });
    };

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nombreCategoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoria.tarifa.toString().includes(searchTerm.toLowerCase())
    );

    const indexOfLastCategoria = currentPage * categoriasPerPage;
    const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
    const currentCategorias = filteredCategorias.slice(indexOfFirstCategoria, indexOfLastCategoria);

    const totalPages = Math.ceil(filteredCategorias.length / categoriasPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className='title'>Categorías</h1>
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
            <h2 className='subtitle'>Lista de Categorías</h2>
            <FormAddCategoria
                isOpen={isAddModalOpen}
                onClose={closeAddModal}
                onCategoriaAdded={handleCategoriaAdded}
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
                        <th>Tarifa</th>
                        {userRole === 'admin' && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentCategorias.map((categoria, index) => (
                        <tr key={categoria.id}>
                            <td>{indexOfFirstCategoria + index + 1}</td>
                            <td>{categoria.nombreCategoria}</td>
                            <td>{categoria.tarifa}</td>
                            {userRole === 'admin' && (
                                <td>
                                    <button
                                        onClick={() => openEditModal(categoria.id)}
                                        className="button is-small is-info"
                                        >
                                        <IoPencil />Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(categoria.id)}
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
                    Mostrando {indexOfFirstCategoria + 1} a {Math.min(indexOfLastCategoria, filteredCategorias.length)} de {filteredCategorias.length} entradas
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

            {isEditModalOpen && selectedCategoria && (
                <FormEditCategoria
                    categoria={selectedCategoria}
                    onClose={closeEditModal}
                    onUpdate={handleCategoriaUpdated}
                />
            )}
        </div>
    );
};

export default Categorialist;
