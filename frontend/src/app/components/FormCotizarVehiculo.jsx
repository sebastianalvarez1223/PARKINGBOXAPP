import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import printJS from "print-js";

const FormCotizarVehiculo = ({ isOpen, onClose, vehiculo, onVehiculoUpdated }) => {
  const [nombreDueño, setNombreDueño] = useState("");
  const [placa, setPlaca] = useState("");
  const [tiempoIngreso, setTiempoIngreso] = useState("");
  const [costo, setCosto] = useState("");
  const [montoPaga, setMontoPaga] = useState("");
  const [diferencia, setDiferencia] = useState(0);
  const [msg, setMsg] = useState("");
  const [tiempoEstacionado, setTiempoEstacionado] = useState(""); // Nuevo estado para tiempo estacionado

  useEffect(() => {
    if (vehiculo) {
      setNombreDueño(vehiculo.nombreDueño || "");
      setPlaca(vehiculo.placa || "");
      setTiempoIngreso(vehiculo.TiempoIngreso ? new Date(vehiculo.TiempoIngreso).toLocaleString() : "");
    }
  }, [vehiculo]);

  const handleCalcularCosto = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/vehiculos/${vehiculo.uuid}/salida`);
      const costoCalculado = response.data.costo;
      const tiempoEstacionadoCalculado = response.data.tiempoEstacionado; // Obtener tiempo estacionado de la respuesta

      setCosto(costoCalculado);
      setTiempoEstacionado(tiempoEstacionadoCalculado); // Guardar tiempo estacionado

      // Convertir costo a número para calcular la diferencia con el monto pagado
      const costoNumerico = parseFloat(costoCalculado.replace(/[^\d.-]/g, ''));
      setDiferencia(costoNumerico - montoPaga);

      Swal.fire({
        icon: "success",
        title: "Costo calculado con éxito",
        text: `Costo del estacionamiento: ${costoCalculado}`,
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Error al calcular el costo");
      } else {
        setMsg("Error al conectar con el servidor");
      }
    }
  };

  const handlePagar = () => {
    const vehiculoData = `
      <h1>Recibo de Pago de Estacionamiento</h1>
      <p><strong>Placa:</strong> ${placa}</p>
      <p><strong>Nombre Dueño:</strong> ${nombreDueño}</p>
      <p><strong>Tiempo de Ingreso:</strong> ${tiempoIngreso}</p>
      <p><strong>Tiempo Estacionado:</strong> ${tiempoEstacionado} minutos</p> <!-- Incluir tiempo estacionado -->
      <p><strong>Costo Estacionamiento:</strong> ${costo}</p>
      <p><strong>Monto Pagado:</strong> ${montoPaga}</p>
      <p><strong>Cambio:</strong> ${diferencia.toFixed(2)}</p>
    `;

    printJS({
      printable: vehiculoData,
      type: "raw-html",
      style: `
        h1 { font-size: 18px; text-align: center; }
        p { font-size: 14px; }
        strong { font-weight: bold; }
      `,
    });

    setTimeout(() => {
      if (typeof onVehiculoUpdated === "function") {
        onVehiculoUpdated();
      }
      onClose();
      window.location.reload();
    }, 1000);
  };

  if (!isOpen || !vehiculo) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Cotizar Vehículo</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
          <button className="button is-primary" style={{ marginLeft: "auto" }} onClick={handleCalcularCosto}>
            Calcular
          </button>
        </header>
        <section className="modal-card-body">
          {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
          <div className="field">
            <label className="label">Nombre Dueño</label>
            <div className="control">
              <input className="input" type="text" value={nombreDueño} readOnly />
            </div>
          </div>
          <div className="field">
            <label className="label">Placa</label>
            <div className="control">
              <input className="input" type="text" value={placa} readOnly />
            </div>
          </div>
          <div className="field">
            <label className="label">Tiempo de Ingreso</label>
            <div className="control">
              <input className="input" type="text" value={tiempoIngreso} readOnly />
            </div>
          </div>
          <div className="field">
            <label className="label">Tiempo Estacionado</label>
            <div className="control">
              <input className="input" type="text" value={tiempoEstacionado} readOnly /> {/* Mostrar tiempo estacionado */}
            </div>
          </div>
          <div className="field">
            <label className="label">Costo Estacionamiento</label>
            <div className="control">
              <input className="input" type="text" value={costo} readOnly /> {/* Formatear costo en pesos colombianos */}
            </div>
          </div>
          <div className="field">
            <label className="label">Monto Pagado</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={montoPaga}
                onChange={(e) => {
                  const nuevoMontoPaga = parseFloat(e.target.value);
                  setMontoPaga(nuevoMontoPaga);
                  const costoNumerico = parseFloat(costo.replace(/[^\d.-]/g, ''));
                  setDiferencia(costoNumerico - nuevoMontoPaga);
                }}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Cambio</label>
            <div className="control">
              <input className="input" type="number" value={diferencia.toFixed(2)} readOnly />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={handlePagar}>
            Pagar
          </button>
          <button className="button" onClick={onClose}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default FormCotizarVehiculo;
