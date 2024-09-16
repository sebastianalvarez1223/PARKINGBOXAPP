import AreaParqueo from "../models/AreaParqueoModel.js";
import Vehiculo from "../models/VehiculosModel.js";
import Categoria from "../models/CategoriaModel.js";

// Create new parking area
export const postAreaParqueo = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    const { categoriaNamebh, categoriaId, ubicacion, capacidadArea } = req.body;
    try { console.log(categoriaId + "categriaId");
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ msg: "Category not found" });
        }
        console.log (categoria + " categoria encontrada");
        const newAreaParqueo = await AreaParqueo.create({
            categoriaNamebh,
            categoriaId,
            ubicacion,
            capacidadArea
        });
        res.status(201).json({ msg: "Parking area created successfully", areaParqueo: newAreaParqueo });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get all parking areas
export const getAreasParqueo = async (req, res) => {
    try {
        const areasParqueo = await AreaParqueo.findAll();
        const areasParqueoCount = areasParqueo.length;
        res.status(200).json({ count: areasParqueoCount, areasParqueo });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get parking area by ID
export const getAreaParqueoById = async (req, res) => {
    try {
        const areaParqueo = await AreaParqueo.findOne({
            where: { id: req.params.id }
        });
        if (!areaParqueo) return res.status(404).json({ msg: "Parking area not found" });
        res.status(200).json(areaParqueo);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



// Update parking area by ID
export const updateAreaParqueo = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    try {
        const areaParqueo = await AreaParqueo.findOne({
            where: { id: req.params.id }
        });
        if (!areaParqueo) return res.status(404).json({ msg: "Parking area not found" });

        const { categoriaNamebh, ubicacion, capacidadArea } = req.body;
        await AreaParqueo.update(
            { categoriaNamebh, ubicacion, capacidadArea },
            { where: { id: areaParqueo.id } }
        );
        res.status(200).json({ msg: "Parking area updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete parking area by ID
export const deleteAreaParqueo = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    try {
        // Find the parking area by ID
        const areaParqueo = await AreaParqueo.findOne({
            where: { id: req.params.id }
        });

        if (!areaParqueo) {
            return res.status(404).json({ msg: "Parking area not found" });
        }

        // Check if the area is used by any vehicle
        const vehiculos = await Vehiculo.findAll({
            where: { areaBahia: areaParqueo.id } // Correct column name for the reference
        });

        if (vehiculos.length > 0) {
            return res.status(400).json({ msg: "Parking area cannot be deleted as it is associated with vehicles" });
        }

        // Delete the parking area
        await AreaParqueo.destroy({
            where: { id: areaParqueo.id }
        });

        res.status(200).json({ msg: "Parking area deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



// Update capacity of parking area when vehicle is created or exits
export const updateCapacity = async (req, res, next) => {
    try {
        const { areaParqueoId } = req.body;
        const areaParqueo = await AreaParqueo.findOne({
            where: { id: areaParqueoId }
        });

        if (!areaParqueo) {
            return res.status(404).json({ msg: "Parking area not found" });
        }

        const vehiculosCount = await Vehiculo.count({
            where: { area }
        });

        if (vehiculosCount > areaParqueo.capacidadArea) {
            return res.status(400).json({ msg: "Parking area capacity exceeded" });
        }

        next();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
