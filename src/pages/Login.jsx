import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoprefeitura.png';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
const handleLogin = (e) => {
    e.preventDefault();
    setErro('');

    // LOGIN FIXO PARA TESTE
    if (usuario === 'admin' && senha === '1234') {
      navigate('/buscar-cnpj');
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };
  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Prefeitura" />
      </header>

      <div className="login-container">
        <h2>Área RestritS</h2>
        <p style={{textAlign:'center', marginBottom:'30px', color:'#ccc'}}>
          Sistema de Recadastramento Empresarial
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite admin"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite 1234"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Entrar no Sistema
          </button>

          {erro && <p className="error" style={{marginTop:'15px'}}>{erro}</p>}

          <p style={{marginTop:'25px', fontSize:'14px', color:'#888', textAlign:'center'}}>
            Teste com:<br/>
            <strong>Usuário:</strong> admin<br/>
            <strong>Senha:</strong> 1234
          </p>
        </form>
      </div>
    </>
  );
}