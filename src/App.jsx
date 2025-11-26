import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Cnpj from './pages/Cnpj.jsx';
import DadosEmpresa from './pages/DadosEmpresa.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/buscar-cnpj" element={<Cnpj/>} />
      <Route path="/dados-empresa" element={<DadosEmpresa />} />
    </Routes>
  );
}