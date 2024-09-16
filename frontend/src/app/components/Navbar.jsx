import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5'; // Importar el icono de logout
import { useDispatch } from 'react-redux';
import './styles.css';
import Logo from '../../logo.png';
import { LogOut, reset } from '../features/authSlice';


const Navbar = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

  return ( 
    <nav className="navbar is-primary"role="navigation"aria-label="main navigation"style={{backgroundImage: 'linear-gradient(90deg, #223035 0%, #223035 100%)'}}>
      <div style={{ color: '#223035' }} >--------------------------------------</div>
      <div className="navbar-brand  ">
      <a className="navbar-item" href="/" target="_blank" rel="noopener noreferrer">
         <img src={Logo} alt="Logo" style={{ maxHeight: '100px', maxWidth: 'auto' }} />
      </a>
      <h1 className="title text-center my-5" style={{ color: 'green', fontSize: '2rem' }}>
        PARKING<span style={{ color: 'white' }}>BOX</span>
      </h1>
      </div>
      <div className="navbar-end">
    <div className="buttons">
        <button className="navbar-logout" onClick={logout}>
            <IoLogOut style={{ marginRight: '2px' }} /> {/* Icono de logout */}
            Cerrar sesiòn
        </button>
    </div>
    </div>
    </nav>
  );
};

export default Navbar;
