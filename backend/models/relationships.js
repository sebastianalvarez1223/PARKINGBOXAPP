import Vehiculo from './VehiculosModel.js';
import Categoria from './CategoriaModel.js';
import User from './UserModel.js';
import AreaParqueo from './AreaParqueoModel.js';

const defineRelationships = () => {
    Categoria.hasMany(Vehiculo, { foreignKey: 'categoriaId' });
    Vehiculo.belongsTo(Categoria, { foreignKey: 'categoriaId' });

    User.hasMany(Vehiculo, { foreignKey: 'userUuid', sourceKey: 'uuid' });
    Vehiculo.belongsTo(User, { foreignKey: 'userUuid', targetKey: 'uuid' });

    User.hasMany(Vehiculo, { foreignKey: 'userId' });
    Vehiculo.belongsTo(User, { foreignKey: 'userId' });

    Categoria.hasMany(AreaParqueo, { foreignKey: 'categoriaId'});
    AreaParqueo.belongsTo(Categoria, { foreignKey: 'categoriaId'});

    Vehiculo.belongsTo(AreaParqueo, { foreignKey: 'areaBahia' });
    AreaParqueo.hasMany(Vehiculo, { foreignKey: 'areaBahia' });
}

export default defineRelationships;
