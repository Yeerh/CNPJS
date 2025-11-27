import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // ← já aponta pra http://localhost:3001/api
import logo from '../assets/logoprefeitura.png';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Chama exatamente a rota que seu back-end espera
      const response = await api.post('/login', {
        usuario: usuario.trim(),
        senha: senha
      });

      // Salva o token JWT que seu back-end retorna
      localStorage.setItem('token', response.data.token);

      // Login com sucesso → vai pra tela de busca CNPJ
      navigate('/cnpj');

    } catch (err) {
      // Tratamento de erro bonito
      const mensagem = err.response?.data?.erro || 
                      err.response?.data?.message || 
                      'Usuário ou senha incorretos';
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Prefeitura" />
      </header>

      <div className="login-container">
        <h2>Acesso Restrito</h2>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#ccc' }}>
          Sistema de Recadastramento Empresarial
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>

          {erro && <p className="error" style={{ marginTop: '15px' }}>{erro}</p>}

          {/* Só pra teste rápido enquanto não tem usuários reais */}
          <p style={{ marginTop: '25px', fontSize: '14px', color: '#888', textAlign: 'center' }}>
            Teste rápido:<br />
            <strong>admin</strong> / <strong>1234</strong>
          </p>
        </form>
      </div>
    </>
  );
}