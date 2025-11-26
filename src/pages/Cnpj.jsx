import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoprefeitura.png';

export default function BuscarCnpj() {
  const navigate = useNavigate();
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);

  const formatarCnpj = (v) => v.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0,18);

  const buscar = (e) => {
    e.preventDefault();
    setLoading(true);

    // CNPJ FIXO DE TESTE
    const empresa = {
      cnpj: '07.563.577/0001-37',
      razao_social: 'GOOGLE BRASIL INTERNET LTDA',
      nome_fantasia: 'Google',
      situacao_cadastral: 'ATIVA',
      logradouro: 'Av. Brigadeiro Faria Lima',
      numero: '3477',
      complemento: '15º andar',
      bairro: 'Itaim Bibi',
      municipio: 'São Paulo',
      uf: 'SP',
      cep: '04538-133',
      telefone: '(11) 3797-1000',
      email: 'brasil@google.com',
      capital_social: 'R$ 10.000.000,00',
      natureza_juridica: 'Sociedade Empresária Limitada',
      data_abertura: '14/10/2005'
    };

    setTimeout(() => {
      navigate('/dados-empresa', { state: empresa });
    }, 1200);
  };

  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Logo" />
      </header>

      <div className="login-container">
        <h2>Buscar Empresa</h2>
        <p style={{color:'#aaa', textAlign:'center', marginBottom:'20px'}}>
          Use o CNPJ de teste abaixo para continuar:
        </p>
        <code style={{display:'block', background:'#333', padding:'15px', borderRadius:'10px', color:'#86efac', fontSize:'20px', textAlign:'center', marginBottom:'25px'}}>
          07.563.577/0001-37
        </code>

        <form onSubmit={buscar}>
          <div className="input-group">
            <label>CNPJ</label>
            <input
              value={cnpj}
              onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Carregando dados...' : 'Buscar e Editar Dados'}
          </button>
        </form>
      </div>
    </>
  );
}