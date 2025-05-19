import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Cadastro realizado com sucesso!');
        setForm({ name: '', email: '', password: '' });
      } else {
        toast.error(data.message || 'Erro ao cadastrar.');
      }
    } catch (err) {
      toast.error('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Cadastro</h2>
      <input
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
        disabled={loading}
        style={{ display: 'block', width: '100%', marginBottom: 8 }}
      />
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
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </form>
  );
}
