import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function ClientList({ onSelect }) {
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({ companyId: '', nombre: '', proyecto: '', email: '' });

  useEffect(() => {
    const fetchClients = async () => {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setClients(data);
    };

    fetchClients();
  }, []);

  const filtered = clients.filter(c =>
    (filters.companyId === '' || c.companyId.toLowerCase().includes(filters.companyId.toLowerCase())) &&
    (filters.nombre === '' || c.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
    (filters.proyecto === '' || c.proyecto.toLowerCase().includes(filters.proyecto.toLowerCase())) &&
    (filters.email === '' || c.email.toLowerCase().includes(filters.email.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <input placeholder="ID" value={filters.companyId} onChange={e => setFilters(f => ({ ...f, companyId: e.target.value }))} />
        <input placeholder="Nombre" value={filters.nombre} onChange={e => setFilters(f => ({ ...f, nombre: e.target.value }))} />
        <input placeholder="Proyecto" value={filters.proyecto} onChange={e => setFilters(f => ({ ...f, proyecto: e.target.value }))} />
        <input placeholder="Email" value={filters.email} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Proyecto</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} onClick={() => onSelect && onSelect(c)} style={{ cursor: 'pointer' }}>
              <td>{c.companyId}</td>
              <td>{c.nombre}</td>
              <td>{c.proyecto}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
