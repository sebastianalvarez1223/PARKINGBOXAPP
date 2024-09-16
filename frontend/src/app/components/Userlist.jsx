import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import FormAddUser from "./FormAddUser";
import FormEditUser from "./FormEditUser";
import {  IoPencil, IoTrash } from 'react-icons/io5';

const UserList = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
    const [currentPage, setCurrentPage] = useState(1); // Estado para la paginación
    const usersPerPage = 10;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${userId}`);
            setSelectedUser(response.data);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserAdded = () => {
        getUsers();
        closeAddModal();
    };

    const handleUserUpdated = () => {
        getUsers();
        closeEditModal();
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado con éxito',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el usuario',
                text: error.response ? error.response.data.msg : 'Error desconocido'
            });
        }
    };

    const handleDeleteClick = (userId) => {
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
                deleteUser(userId);
            }
        });
    };

    // Filtrar los usuarios basados en el término de búsqueda
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Obtener los usuarios de la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className='title'>Usuarios</h1>
                <button onClick={openAddModal} className="button is-primary mb-2" style={{ backgroundColor: '#8bb48b', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }}>
                    Agregar Nuevo
                </button>
            </div>
            <h2 className='subtitle'>Lista de Usuarios</h2>
            <FormAddUser isOpen={isAddModalOpen} onClose={closeAddModal} onUserAdded={handleUserAdded} />

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
                        <th>Email</th>
                        <th>Role</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.uuid}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    onClick={() => openEditModal(user.uuid)}
                                    className="button is-small is-info"
                                >
                                    <IoPencil />Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(user.uuid)}
                                    className="button is-small is-danger"
                                >
                                    <IoTrash />Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <p>
                    Mostrando {indexOfFirstUser + 1} a {Math.min(indexOfLastUser, filteredUsers.length)} de {filteredUsers.length} entradas
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

            {isEditModalOpen && selectedUser && (
                <FormEditUser
                    user={selectedUser}
                    onClose={closeEditModal}
                    onUpdate={handleUserUpdated}
                />
            )}
        </div>
    );
};

export default UserList;
