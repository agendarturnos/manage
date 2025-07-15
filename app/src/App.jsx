import { useState } from 'react';
import ClientList from './components/ClientList';
import Payments from './components/Payments';
// App layout is styled via mockup.css

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <>
      <ClientList onSelect={setSelectedClient} />
      <Payments client={selectedClient} />
    </>
  );
}

export default App;
