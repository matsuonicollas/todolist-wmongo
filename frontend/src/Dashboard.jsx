import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthService } from './auth';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  // Função para buscar todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      });
      if (res.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        AuthService.removeToken();
        navigate('/login');
        return;
      }
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      toast.error('Erro ao buscar itens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  // Função para criar novo todo
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res2 = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });
      if (res2.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        AuthService.removeToken();
        navigate('/login');
        return;
      }
      if (!res2.ok) {
        toast.error('Erro ao criar item.');
        return;
      }
      setNewTodo('');
      fetchTodos();
      toast.success('Item criado!');
    } catch {
      toast.error('Erro de conexão.');
    }
  };

  // Função para deletar todo
  const handleDelete = async (id) => {
    try {
      const res3 = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${AuthService.getToken()}` },
      });
      if (res3.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        AuthService.removeToken();
        navigate('/login');
        return;
      }
      if (!res3.ok) {
        toast.error('Erro ao deletar item.');
        return;
      }
      fetchTodos();
      toast.success('Item deletado!');
    } catch {
      toast.error('Erro de conexão.');
    }
  };

  // Função para alternar status do todo
  const handleToggleStatus = async (todo) => {
    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          status: todo.status === 'concluído' ? 'pendente' : 'concluído',
        }),
      });
      if (res.status === 401) {
        toast.error('Sessão expirada. Faça login novamente.');
        AuthService.removeToken();
        navigate('/login');
        return;
      }
      if (!res.ok) {
        toast.error('Erro ao atualizar status.');
        return;
      }
      fetchTodos();
    } catch {
      toast.error('Erro de conexão.');
    }
  };

  // Função de logout
  const handleLogout = () => {
    AuthService.removeToken();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Área Logada</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <form onSubmit={handleCreate} style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Novo item"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, background: '#646cff', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'background 0.2s' }}>
          Adicionar
        </button>
      </form>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo._id} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', background: '#f9f9f9', borderRadius: 8, padding: '10px 16px', boxShadow: '0 1px 4px #0001' }}>
              <input type="checkbox" checked={todo.status === 'concluído'} onChange={() => handleToggleStatus(todo)} style={{ marginRight: 12, width: 20, height: 20 }} />
              <span style={{ flex: 1, textDecoration: todo.status === 'concluído' ? 'line-through' : 'none', color: todo.status === 'concluído' ? '#888' : '#222', fontSize: 17 }}>
                {todo.title}
              </span>
              <button onClick={() => handleDelete(todo._id)} style={{ marginLeft: 8, padding: '6px 14px', borderRadius: 6, background: '#ff4d4f', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
