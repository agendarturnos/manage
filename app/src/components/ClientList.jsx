import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fallbackClients = [
  {
    id: 'demo1',
    companyId: 'A100',
    nombre: 'Cliente Demo 1',
    proyecto: 'Proyecto Demo 1',
    email: 'demo1@example.com',
  },
  {
    id: 'demo2',
    companyId: 'A101',
    nombre: 'Cliente Demo 2',
    proyecto: 'Proyecto Demo 2',
    email: 'demo2@example.com',
  },
];

export default function ClientList({ onSelect }) {
  const [clients, setClients] = useState([]);
  const [filters, setFilters] = useState({ companyId: '', nombre: '', proyecto: '', email: '' });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clientes'));
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setClients(data);
      } catch (err) {
        console.error(err);
        setClients(fallbackClients);
      }
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
    <div className="contenedor">
      <h2>Buscar Clientes</h2>
      <form
        className="screen-set-filtros"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="fCompanyId">Company Id</label>
          <input
            id="fCompanyId"
            type="text"
            value={filters.companyId}
            autoComplete="off"
            onChange={e => setFilters(f => ({ ...f, companyId: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="fNombre">Nombre y Apellido</label>
          <input
            id="fNombre"
            type="text"
            value={filters.nombre}
            autoComplete="off"
            onChange={e => setFilters(f => ({ ...f, nombre: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="fProyecto">Nombre del Proyecto</label>
          <input
            id="fProyecto"
            type="text"
            value={filters.proyecto}
            autoComplete="off"
            onChange={e => setFilters(f => ({ ...f, proyecto: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="fEmail">Email</label>
          <input
            id="fEmail"
            type="text"
            value={filters.email}
            autoComplete="off"
            onChange={e => setFilters(f => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div className="acciones">
          <button type="submit" className="btn-buscar">
            Buscar
          </button>
          <button
            type="button"
            className="btn-limpiar"
            onClick={() =>
              setFilters({ companyId: '', nombre: '', proyecto: '', email: '' })
            }
          >
            Limpiar
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Company Id</th>
            <th>Nombre y Apellido</th>
            <th>Nombre del Proyecto</th>
            <th>Email</th>
            <th>Pagos</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="fila-cliente">
              <td>{c.companyId}</td>
              <td>{c.nombre}</td>
              <td>{c.proyecto}</td>
              <td>{c.email}</td>
              <td>
                <button
                  type="button"
                  className="ver-pagos-btn"
                  onClick={() => onSelect && onSelect(c)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
