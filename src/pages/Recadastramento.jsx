import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logoprefeitura.png';

export default function Recadastramento() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const empresa = state;

  const [form, setForm] = useState({
    responsavel: '',
    telefone: '',
    email: '',
    cep: empresa?.cep?.replace(/(\d{5})(\d{3})/, '$1-$2') || '',
    logradouro: empresa?.logradouro || '',
    numero: empresa?.numero || '',
    complemento: empresa?.complemento || '',
    bairro: empresa?.bairro || '',
    municipio: empresa?.municipio || '',
    uf: empresa?.uf || ''
  });

  const maskTel = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0,15);
  const maskCep = (v) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0,9);

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'telefone') val = maskTel(val);
    if (e.target.name === 'cep') val = maskCep(val);
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Recadastramento enviado com sucesso!', 'Tudo certo!');
    console.log('Dados enviados →', { empresa, form });
  };

  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Logo" />
      </header>

      <div className="login-container">
        <h2>Recadastramento</h2>
        <p className="empresa-info">
          <strong>{empresa.razao_social}</strong><br />
          CNPJ: {empresa.cnpj}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome do Responsável *</label>
            <input name="responsavel" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Telefone/WhatsApp *</label>
            <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 90000-0000" required />
          </div>

          <div className="input-group">
            <label>E-mail *</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>CEP *</label>
            <input name="cep" value={form.cep} onChange={handleChange} placeholder="00000-000" required />
          </div>

          <div className="input-group">
            <label>Endereço</label>
            <input name="logradouro" value={form.logradouro} onChange={handleChange} required />
          </div>

          <div className="grid-3">
            <div className="input-group">
              <label>Número</label>
              <input name="numero" value={form.numero} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Complemento</label>
              <input name="complemento" value={form.complemento} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Bairro</label>
              <input name="bairro" value={form.bairro} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid-2">
            <div className="input-group">
              <label>Cidade</label>
              <input name="municipio" value={form.municipio} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>UF</label>
              <input name="uf" value={form.uf} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Confirmar Recadastramento
          </button>

          <button type="button" onClick={() => navigate('/')} className="back-btn">
            Voltar
          </button>
        </form>
      </div>
    </>
  );
}