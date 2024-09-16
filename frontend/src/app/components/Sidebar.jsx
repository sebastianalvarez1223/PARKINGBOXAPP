// Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoPerson, IoHome, IoLogOut, IoMenu, IoClose, IoCar, IoCalendar, IoMap, IoHelpCircle, IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../features/authSlice';
import './styles.css';

export const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    const Fixed = ({ children, ...props }) => (
        <div {...props}>
            {children}
        </div>
    );

    return (
        <div style={{ display: 'flex' }}>
            <button
                className="toggle-button"
                onClick={toggleSidebar}
                style={{
                    position: 'Fixed',
                    top: '0px',  // Ajusta esta altura según la altura del navbar
                    left: '00px',
                    zIndex: 1000,
                    backgroundColor: '#223035',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px'
                }}
            >
                {isSidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
            </button>
            <Fixed
                className={`menu pl-1 has-shadow ${isSidebarOpen ? '' : 'closed'}`}
                style={{
                    backgroundColor: '#223035',
                    color: 'white',
                    width: isSidebarOpen ? '250px' : '0',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden', 
                    height: 'calc(255vh - 110px)',  // Ajusta para estar debajo del navbar
                    position: 'fixed',
                    top: '0px',  // Ajusta esta altura según la altura del navbar
                    left: 0,
                    zIndex: 999
                }}
            >
                {user && (
                    <div className="user-info" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <IoPersonCircleSharp size={183} />
                        <p>{user.name}</p>
                    </div>
                )}
                <p className='text' style={{ color: '#3399FF' }}>General</p>
                <ul className=".menu-list">
                    <li >
                    <NavLink to={"/dashboard"} className="sidebar-link"style={{ backgroundColor: '#223035',}}><IoHome /> Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/vehiculos"} className="sidebar-link"style={{ backgroundColor: '#223035',}} ><IoCar /> Vehículos Ingreso</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/categoria"} className="sidebar-link"><IoCalendar /> Categorías</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/areasparqueo"} className="sidebar-link"><IoMap /> Àreas Parqueo</NavLink>
                    </li>
                </ul>
                {user && user.role === "admin" && (
                    <div>
                        <p className='text' style={{ color: '#3399FF' }}>Administrador</p>
                        <ul className=".menu-list">
                            <li>
                                <NavLink to={"/users"} className="sidebar-link"style={{ backgroundColor: '#223035',}} ><IoPerson /> Usuarios</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
                <p className='text' style={{ color: '#3399FF' }}>Sistema</p>
                <ul className=".menu-list ">
                   <li>
                       <NavLink to={"/ayudas"} className="sidebar-link" style={{ backgroundColor: '#223035',  borderRadius: '4px' }}><IoHelpCircle /> Ayuda</NavLink>
                    </li>
                    <li>
                        <button onClick={logout} className="navbar-logout" style={{ backgroundColor: '#223035',  border: 'none', padding: '8px', borderRadius: '4px' }}>
                            <IoLogOut /> Cerrar sesiòn
                        </button>
                    </li>
                </ul>
            </Fixed>
            <div style={{ 
                flexGrow: 1, 
                transition: 'margin-left 0.3s ease', 
                marginLeft: isSidebarOpen ? '250px' : '0', 
                width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
                marginTop: '70px'  // Ajusta para que el contenido no se superponga al navbar
            }}>
                {/* Aquí iría el contenido principal de la página */}
            </div>
        </div>
    );
};


export default Sidebar;
