import { useState } from 'react';
import ClientList from './components/ClientList';
import Payments from './components/Payments';
import './App.css';

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Clientes</h1>
      <ClientList onSelect={setSelectedClient} />
      <hr />
      <Payments client={selectedClient} />
    </div>
  );
}

export default App;
