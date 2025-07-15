import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Payments({ client }) {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ monto: '', fecha: '', proximo: '', meses: '' });

  useEffect(() => {
    const fetchPayments = async () => {
      if (!client) return;
      const q = query(collection(db, 'pagos'), where('companyId', '==', client.companyId));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setPayments(data);
    };
    fetchPayments();
  }, [client]);

  const addPayment = async (e) => {
    e.preventDefault();
    if (!client) return;
    await addDoc(collection(db, 'pagos'), {
      companyId: client.companyId,
      monto: Number(form.monto),
      fecha: form.fecha,
      proximo: form.proximo,
      meses: Number(form.meses),
    });
    setForm({ monto: '', fecha: '', proximo: '', meses: '' });
    const q = query(collection(db, 'pagos'), where('companyId', '==', client.companyId));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    setPayments(data);
  };

  if (!client) return <div>Selecciona un cliente para ver sus pagos</div>;

  return (
    <div>
      <h3>Pagos para {client.nombre}</h3>
      <form onSubmit={addPayment} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input required type="number" placeholder="Monto" value={form.monto} onChange={e => setForm(f => ({ ...f, monto: e.target.value }))} />
        <input required type="date" placeholder="Fecha" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} />
        <input required type="date" placeholder="Próximo" value={form.proximo} onChange={e => setForm(f => ({ ...f, proximo: e.target.value }))} />
        <input required type="number" placeholder="Meses" value={form.meses} onChange={e => setForm(f => ({ ...f, meses: e.target.value }))} />
        <button>Agregar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Próximo</th>
            <th>Meses</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.monto}</td>
              <td>{p.fecha}</td>
              <td>{p.proximo}</td>
              <td>{p.meses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
