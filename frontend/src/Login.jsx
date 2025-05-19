import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('jwt', data.token);
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      toast.error('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        required
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 8 }}
      />
      <input
        name="password"
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        required
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 8 }}
      />
      <button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      <p style={{ marginTop: 16 }}>
        Não tem conta? <Link to="/">Cadastre-se</Link>
      </p>
    </form>
  );
}
