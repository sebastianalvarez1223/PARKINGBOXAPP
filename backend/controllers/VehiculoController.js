// VehiculoController.js
import Vehiculo from "../models/VehiculosModel.js";
import User from "../models/UserModel.js"; 
import Categoria from "../models/CategoriaModel.js";
import AreaParqueo from "../models/AreaParqueoModel.js";
import { Op } from "sequelize";


// Get all vehicles
export const getVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll({
            include: [
                {
                    model: Categoria,
                    attributes: ['nombreCategoria', 'tarifa']
                },
                {
                    model: User, // Asegúrate de que 'User' esté correctamente importado
                    attributes: ['name', 'email'] // Atributos que deseas obtener del usuario
                }
            ]
        });
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const getVehiculoById = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        if (!vehiculo) return res.status(404).json({ msg: "Data not found" });

        console.log("Usuario logueado:", req.role);
        console.log("Detalles del vehiculo:", vehiculo);

        let response;
        if (req.role === "admin","user") {
            response = vehiculo;
        } else {
            if (vehiculo.User && vehiculo.User.role !== req.role) {
                return res.status(403).json({ msg: "Forbidden access" });
            }
            response = vehiculo;
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// Create new vehicle
export const createVehiculo = async (req, res) => {
    try {
        // Obtener el userId desde la sesión
        const { userId } = req.session;

        // Verificar si el usuario está autenticado
        if (!userId) {
            return res.status(400).json({ message: "Sesión de usuario inválida. Por favor, inicie sesión nuevamente." });
        }

        // Buscar el usuario utilizando el userUuid en la sesión
        const user = await User.findOne({
            attributes: ['id', 'uuid'],
            where: { uuid: userId }  // Buscar por UUID
        });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado." });
        }

        // Desestructurar los campos del cuerpo de la solicitud
        const { categoriaId, areaBahia, marca, placa, nombreDueño, descripcion } = req.body;

        // Encuentra el área de parqueo correspondiente
        const area = await AreaParqueo.findOne({ where: { id: areaBahia } });
        if (!area) return res.status(404).json({ message: "Área de parqueo no encontrada" });

        // Verificar si hay espacio disponible en el área de parqueo
        if (area.capacidadArea <= 0) return res.status(400).json({ message: "No hay espacio disponible en esta área" });

        // Crear un nuevo vehículo con los datos proporcionados y los del usuario autenticado
        const nuevoVehiculo = await Vehiculo.create({
            categoriaId,
            areaBahia,
            marca,
            placa,
            nombreDueño,
            descripcion,
            userUuid: user.uuid,  // Usar el uuid del usuario
            userId: user.id,  // Usar el id del usuario
            status: 0,  // Establecer el estado a 0 (entrada)
            TiempoIngreso: new Date()  // Asigna la fecha y hora actual
        });

        // Reducir la capacidad del área de parqueo
        area.capacidadArea -= 1;
        await area.save();

        // Responder con éxito y los datos del nuevo vehículo
        res.status(201).json({ message: "Vehículo creado", data: nuevoVehiculo });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: error.message });
    }
};



// Re-ingresar vehículo
export const ReIngreso = async (req, res) => {
    try {
        const { nombreDueño } = req.body;

        // Encontrar el vehículo por su UUID
        const vehiculo = await Vehiculo.findOne({ where: { uuid: req.params.id } });

        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

        // Encontrar el área de parqueo correspondiente
        const area = await AreaParqueo.findOne({ where: { id: vehiculo.areaBahia } });
        if (!area) return res.status(404).json({ message: "Área de parqueo no encontrada" });

        // Verificar si hay espacio disponible en el área de parqueo
        if (area.capacidadArea <= 0) {
            return res.status(400).json({ message: "No hay espacio disponible en esta área" });
        }

        // Actualizar estado a false (entrada), nombre del dueño y la fecha/hora de reingreso
        vehiculo.status = false;
        vehiculo.nombreDueño = nombreDueño;
        vehiculo.TiempoIngreso = new Date(); // Asigna la fecha y hora actual
        await vehiculo.save();

        // Reducir la capacidad del área de parqueo
        area.capacidadArea -= 1;
        await area.save();

        // Responder con éxito y los datos del vehículo reingresado
        res.status(200).json({ message: "Vehículo reingresado con éxito", data: vehiculo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update vehicle
export const updateVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({
            where: { uuid: req.params.id }
        });
        if (!vehiculo) return res.status(404).json({ msg: "Data not found" });

        const { categoriaId, areaBahia, marca, placa, nombreDueño, descripcion } = req.body;
        if (req.role === "admin") {
            await Vehiculo.update(
                { categoriaId, areaBahia, marca, placa, nombreDueño, descripcion },
                { where: { uuid: vehiculo.uuid } }
            );
        } else {
            if (req.userId !== vehiculo.userId) return res.status(403).json({ msg: "Forbidden access" });
            await Vehiculo.update(
                { categoriaId, areaBahia, marca, placa, nombreDueño, descripcion },
                { where: { [Op.and]: [{ uuid: vehiculo.uuid }, { userId: req.userId }] } }
            );
        }
        res.status(200).json({ msg: "Vehicle updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete vehicle
export const deleteVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({
            where: { uuid: req.params.id }
        });
        if (!vehiculo) return res.status(404).json({ msg: "Data not found" });

        if (req.role === "admin") {
            await Vehiculo.destroy({
                where: { uuid: vehiculo.uuid }
            });
        } else {
            if (req.userId !== vehiculo.userId) return res.status(403).json({ msg: "Forbidden access" });
            await Vehiculo.destroy({
                where: { [Op.and]: [{ uuid: vehiculo.uuid }, { userId: req.userId }] }
            });
        }
        res.status(200).json({ msg: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const salidaVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Categoria,
                attributes: ['id', 'tarifa']
            }]
        });

        if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });

        if (!vehiculo.categorium.id) return res.status(404).json({ msg: "Categoría no encontrada" });

        const entrada = new Date(vehiculo.TiempoIngreso);
        const salida = new Date();
        const tiempoEstacionado = (salida - entrada) / 100 / 60; // tiempo en minutos

        const tarifaPorMinuto = vehiculo.categorium.tarifa / 60;
        const costo = tiempoEstacionado * tarifaPorMinuto *10;

        const tiempoEstacionadoFormateado = tiempoEstacionado.toFixed(2).slice(0, 8);
        
        // Formatear el costo en pesos colombianos con separadores de miles
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2
        });

        const costoFormateado = formatter.format(costo);

        // Actualizar el estado del vehículo a 1 (salida)
        vehiculo.status = 1;
        await vehiculo.save();

        // Aumentar la capacidad del área de parqueo
        const area = await AreaParqueo.findOne({ where: { id: vehiculo.areaBahia } });
        if (area) {
            area.capacidadArea += 1;
            await area.save();
        }

        res.status(200).json({
            msg: "Costo de estacionamiento calculado correctamente",
            tiempoEstacionado: tiempoEstacionadoFormateado,
            costo: costoFormateado
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ msg: error.message });
    }
};


