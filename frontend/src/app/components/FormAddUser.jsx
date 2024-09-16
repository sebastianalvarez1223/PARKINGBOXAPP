import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const FormAddUser = ({ isOpen, onClose, onUserAdded }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("User");
    const [msg, setMsg] = useState("");

    const GuardarUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                password,
                confPassword,
                role
            });
            setName("");
            setEmail("");
            setPassword("");
            setConfPassword("");
            setRole("User");

            Swal.fire({
                icon: 'success',
                title: 'Usuario Creado',
                text: 'El usuario fue creado con éxito.',
                timer: 2000,
                showConfirmButton: false
            });

            onUserAdded(); // Actualiza la lista de usuarios y cierra el modal
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Agregar Nuevo Usuario</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={GuardarUser}>
                        {msg && <p className="has-text-centered">{msg}</p>}
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
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
                                    placeholder="Email"
                                />
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
                                    placeholder="******"
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
                                    placeholder="******"
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
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-success">
                                    Guardar
                                </button>
                            </div>
                            <div className="control">
                                <button type="button" className="button" onClick={onClose}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default FormAddUser;
