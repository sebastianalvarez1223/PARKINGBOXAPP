import Categoria from "../models/CategoriaModel.js";
import Vehiculo from "../models/VehiculosModel.js";

// Get all categories
export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        const categoriasCount = categorias.length;
        res.status(200).json({ count: categoriasCount, categorias });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findOne({
            where: { id: req.params.id }
        });
        if (!categoria) return res.status(404).json({ msg: "Category not found" });
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Create new category
export const createCategoria = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    const { nombreCategoria, tarifa } = req.body;
    try {
        const newCategoria = await Categoria.create({
            nombreCategoria,
            tarifa
        });
        res.status(201).json({ msg: "Category created successfully", categoria: newCategoria });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Update category
export const updateCategoria = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    try {
        const categoria = await Categoria.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!categoria) return res.status(404).json({ msg: "Data not found" });

        const { nombreCategoria, tarifa } = req.body;
        await Categoria.update(
            { nombreCategoria, tarifa },
            { where: { id: categoria.id } }
        );
        res.status(200).json({ msg: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Delete category
export const deleteCategoria = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: "Forbidden access" });
    }

    try {
        const categoria = await Categoria.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!categoria) return res.status(404).json({ msg: "Data not found" });

        // Check if the category is used by any vehicle
        const vehiculo = await Vehiculo.findOne({
            where: {
                categoriaId: categoria.id
            }
        });

        if (vehiculo) {
            return res.status(400).json({ msg: "Category cannot be deleted as it is associated with vehicles" });
        }

        await Categoria.destroy({
            where: { id: categoria.id }
        });
        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
