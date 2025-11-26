import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logoprefeitura.png';

export default function DadosEmpresa() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const empresaOriginal = state;

  const [form, setForm] = useState({ ...empresaOriginal });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = (e) => {
    e.preventDefault();
    alert('Dados salvos com sucesso no sistema!');
    console.log('Dados atualizados:', form);
  };

  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Logo" />
      </header>

      <div className="login-container">
        <h2>Dados da Empresa</h2>
        <p style={{textAlign:'center', color:'#86efac', marginBottom:'25px'}}>
          CNPJ: {form.cnpj}
        </p>

        <form onSubmit={salvar}>
          <div className="input-group">
            <label>Razão Social</label>
            <input name="razao_social" value={form.razao_social} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Nome Fantasia</label>
            <input name="nome_fantasia" value={form.nome_fantasia} onChange={handleChange} />
          </div>

          <div className="grid-2">
            <div className="input-group">
              <label>Telefone</label>
              <input name="telefone" value={form.telefone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" />
            </div>
          </div>

          <div className="input-group">
            <label>Endereço Completo</label>
            <input value={`${form.logradouro}, ${form.numero} - ${form.bairro}`} readOnly style={{background:'#444'}} />
          </div>

          <div className="grid-2">
            <div className="input-group">
              <label>Capital Social</label>
              <input name="capital_social" value={form.capital_social} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Data de Abertura</label>
              <input name="data_abertura" value={form.data_abertura} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Salvar Alterações
          </button>

          <button type="button" onClick={() => navigate('/buscar-cnpj')} className="back-btn" style={{marginTop:'10px', background:'#6b7280'}}>
            Buscar Outro CNPJ
          </button>
        </form>
      </div>
    </>
  );
}