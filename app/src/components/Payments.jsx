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

  if (!client) return null;

  return (
    <div className="panel-pagos">
      <div className="info-cliente">
        {client.nombre} &bull; {client.email}
      </div>
      <h3>Pagos registrados</h3>
      <form className="form-agregar" onSubmit={addPayment}>
        <div>
          <label>Monto ($):</label>
          <input
            type="number"
            required
            value={form.monto}
            onChange={e => setForm(f => ({ ...f, monto: e.target.value }))}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            required
            value={form.fecha}
            onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))}
          />
        </div>
        <div>
          <label>Próximo pago:</label>
          <input
            type="date"
            required
            value={form.proximo}
            onChange={e => setForm(f => ({ ...f, proximo: e.target.value }))}
          />
        </div>
        <div>
          <label>Meses pagados:</label>
          <input
            type="number"
            required
            value={form.meses}
            onChange={e => setForm(f => ({ ...f, meses: e.target.value }))}
          />
        </div>
        <div className="acciones">
          <button type="submit" className="btn-agregar">
            Agregar
          </button>
        </div>
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
              <td>{'$' + p.monto}</td>
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
