import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Importa tus estilos personalizados
import Logo from '../../logo.png';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido al panel de control',
        timer: 2000, // El tiempo que la alerta estará visible en milisegundos
        showConfirmButton: false, // No mostrar el botón de confirmación
      }).then(() => {
        navigate("/dashboard");
      });
    }

    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la autenticación',
        text: 'Parece que hay un error en la validación de tus credenciales',
        timer: 2000, // El tiempo que la alerta estará visible en milisegundos
        showConfirmButton: false, // No mostrar el botón de confirmación
      });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg p-3 mb-5 rounded">
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <a className="navbar-item" href="/" style={{ padding: 0 }}>
                      <img src={Logo} alt="Logo" style={{ maxHeight: '100px', maxWidth: 'auto' }} />
                    </a>
                  </div>
                  <h1 className="card-title text-center mb-4">
                    Ingresa a <span className="text-success">PARKING</span>
                    <span className="text-darkwhite" >BOX</span>
                  </h1>
                  {isError && <p className="text-danger text-center">{message}</p>}
                  <form onSubmit={Auth} className='form-signin'>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='******'
                        required />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-block mt-4">
                      {isLoading ? 'Iniciando...' : 'Iniciar'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
