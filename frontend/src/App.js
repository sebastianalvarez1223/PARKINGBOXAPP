import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./app/pages/Dashboard";
import Login from "./app/components/Login";
import Users from "./app/pages/Users";
import Vehiculos from './app/pages/Vehiculos';
import Categorias from './app/pages/Categorias';
import AddCategoria from "./app/pages/AddCategoria";
import EditCategoria from "./app/pages/EditCategoria";
import AddUser from "./app/pages/AddUser";
import AddVehiculo from "./app/pages/AddVehiculo";
import EditVehiculo from "./app/pages/EditVehiculo";
import Reingresar from "./app/pages/Reingresar";
import Cotizar from './app/pages/Cotizar';
import EditUser from "./app/pages/EditUser";
import Home from "./app/components/Home";
import AreaParqueo from "./app/pages/AreaParqueo";         // Importar la página de lista de áreas de parqueo
import AddAreaParqueo from "./app/pages/AddAreaParqueo";   // Importar la página para agregar área de parqueo
import EditAreaParqueo from "./app/pages/EditAreaParqueo"; 
import AyudasPage from "./app/pages/AyudasPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/categoria" element={<Categorias />} />
          <Route path="/categorias/add" element={<AddCategoria />} />
          <Route path="/categorias/edit/:id" element={<EditCategoria />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/vehiculos/add" element={<AddVehiculo />} />
          <Route path="/vehiculos/edit/:id" element={<EditVehiculo />} />
          <Route path="/vehiculos/reingresar/:id" element={<Reingresar />} />
          <Route path="/cotizar" element={<Cotizar />} />
          <Route path="/areasparqueo" element={<AreaParqueo />} />
          <Route path="/areasparqueo/add" element={<AddAreaParqueo />} />
          <Route path="/areasparqueo/edit/:id" element={<EditAreaParqueo />} /> 
          <Route path="/ayudas" element={<AyudasPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
