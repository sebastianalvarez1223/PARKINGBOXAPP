import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormEditUser = ({ user, onClose, onUpdate }) => {
    const [name, setName] = useState(user.name || ""); // Inicializar con los datos del usuario
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState(user.role || "");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }, [user]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${user.uuid}`, {
                name,
                email,
                password,
                confPassword,
                role
            });
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado con éxito',
                showConfirmButton: false,
                timer: 1500
            });
            onUpdate();
            onClose();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Actualizar Usuario</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    {msg && <p className="has-text-centered">{msg}</p>}
                    <form onSubmit={updateUser}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input type="text"
                                    className="input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Name' />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email' />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='******'
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Confirm Password</label>
                            <div className="control">
                                <input
                                    type="password"
                                    className="input"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    placeholder='******'
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Role</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="admin">admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button type="submit" className="button is-success" onClick={updateUser}>Actualizar</button>
                    <button className="button" onClick={onClose}>Cancelar</button>
                </footer>
            </div>
        </div>
    );
};

export default FormEditUser;
