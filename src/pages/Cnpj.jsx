import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import io from 'socket.io-client';
import logo from '../assets/logoprefeitura.png';

// Conexão Socket.IO (fora do componente pra não recriar a cada render)
const socket = io('http://localhost:3001', {
  withCredentials: true,
  reconnection: true,
});

export default function BuscarCnpj() {
  const navigate = useNavigate();
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const formatarCnpj = (v) =>
    v.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);

  const buscar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    const cnpjLimpo = cnpj.replace(/\D/g, '');

    try {
      const response = await api.post('/cnpj', { cnpj: cnpjLimpo });

      // Resposta do seu back-end exata
      const { empresaExistente } = response.data;

      if (!empresaExistente) {
        setMensagem('Seu CNPJ está regularizado, não precisa recadastrar :)');
        setLoading(false);
        return;
      }

      // Empresa precisa recadastrar → vai pra tela de edição
      setMensagem('Empresa encontrada! Redirecionando para edição...');
      setTimeout(() => {
        navigate('/dados-empresa', { state: empresaExistente });
      }, 1200);

    } catch (err) {
      const erro = err.response?.data?.message || 
                   err.response?.data?.erro || 
                   'Erro interno do servidor';
      setMensagem(erro);
    } finally {
      setLoading(false);
    }
  };

  // ESCUTA O SOCKET EM TEMPO REAL (igual seu back-end emite)
  useEffect(() => {
    socket.on('cnpjStatus', (data) => {
      const cnpjAtual = cnpj.replace(/\D/g, '');
      if (data.cnpj === cnpjAtual) {
        if (data.empresaExistente) {
          setMensagem('Status atualizado: Precisa recadastrar!');
        } else {
          setMensagem('Status atualizado: CNPJ regularizado!');
        }
      }
    });

    return () => {
      socket.off('cnpjStatus');
    };
  }, [cnpj]);

  return (
    <>
      <div className="animated-background"></div>
      <header className="main-header">
        <img src={logo} alt="Logo Prefeitura" />
      </header>

      <div className="login-container">
        <h2>Buscar Empresa</h2>

        <form onSubmit={buscar}>
          <div className="input-group">
            <label>CNPJ da Empresa</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
              placeholder="00.000.000/0000-00"
              maxLength={18}
              required
              autoFocus
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Buscando...' : 'Buscar e Editar Dados'}
          </button>
        </form>

        {mensagem && (
          <p
            className={mensagem.includes('regularizado') || mensagem.includes('não precisa') ? 'success' : 'error'}
            style={{ marginTop: '20px', textAlign: 'center', fontWeight: '600' }}
          >
            {mensagem}
          </p>
        )}

        {/* Só pra teste rápido */}
        <p style={{ marginTop: '30px', fontSize: '14px', color: '#888', textAlign: 'center' }}>
          CNPJ de teste (Google Brasil):<br />
          <strong style={{ color: '#86efac' }}>07.563.577/0001-37</strong>
        </p>
      </div>
    </>
  );
}