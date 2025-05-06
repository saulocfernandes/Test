import { useState } from 'react';
import './App.css';

const data = [
  { name: 'JOSE DOS SANTOS', type: 'Travel', amount: 913.25, costCenter: '501 - Missions', unit: 'UR01 - Catedral', department: 'DEP01 - Missões', date: new Date('2025-04-01') },
  { name: 'ELAINE SILVA', type: 'Meals', amount: 475.4, costCenter: '502 - Events', unit: 'UR02 - Matriz', department: 'DEP02 - Eventos', date: new Date('2025-04-05') },
  { name: 'MARCOS ALVES', type: 'Lodging', amount: 1600.0, costCenter: '501 - Missions', unit: 'UR01 - Catedral', department: 'DEP01 - Missões', date: new Date('2025-04-10') },
  { name: 'CARLOS SOARES', type: 'Miscellaneous', amount: 200.0, costCenter: '501 - Missions', unit: 'UR01 - Catedral', department: 'DEP01 - Missões', date: new Date('2025-04-12') },
  { name: 'CRISTIANO PEREIRA', type: 'Travel', amount: 231.0, costCenter: '502 - Events', unit: 'UR02 - Matriz', department: 'DEP02 - Eventos', date: new Date('2025-04-15') },
];

function App() {
  const [filters, setFilters] = useState({ name: 'all', type: 'all', unit: 'all', department: 'all', startDate: '', endDate: '' });

  const uniqueNames = [...new Set(data.map(item => item.name))];

  const filteredData = data.filter(item => {
    const itemDate = item.date.toISOString().split('T')[0];
    return (
      (filters.name === 'all' || item.name === filters.name) &&
      (filters.type === 'all' || item.type === filters.type) &&
      (filters.unit === 'all' || item.unit === filters.unit) &&
      (filters.department === 'all' || item.department === filters.department) &&
      (filters.startDate === '' || itemDate >= filters.startDate) &&
      (filters.endDate === '' || itemDate <= filters.endDate)
    );
  });

  return (
    <div className="App">
      <h2>Dashboard de Despesas</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <select onChange={e => setFilters({ ...filters, name: e.target.value })}>
          <option value="all">Todos os Colaboradores</option>
          {uniqueNames.map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
        </select>

        <select onChange={e => setFilters({ ...filters, type: e.target.value })}>
          <option value="all">Todos os Tipos</option>
          <option value="Travel">Viagem</option>
          <option value="Meals">Alimentação</option>
          <option value="Lodging">Hospedagem</option>
          <option value="Miscellaneous">Outros</option>
        </select>

        <select onChange={e => setFilters({ ...filters, unit: e.target.value })}>
          <option value="all">Todas as Unidades</option>
          <option value="UR01 - Catedral">UR01 - Catedral</option>
          <option value="UR02 - Matriz">UR02 - Matriz</option>
        </select>

        <select onChange={e => setFilters({ ...filters, department: e.target.value })}>
          <option value="all">Todos os Departamentos</option>
          <option value="DEP01 - Missões">DEP01 - Missões</option>
          <option value="DEP02 - Eventos">DEP02 - Eventos</option>
        </select>

        <input type="date" value={filters.startDate} onChange={e => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" value={filters.endDate} onChange={e => setFilters({ ...filters, endDate: e.target.value })} />
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Valor (BRL)</th>
            <th>Centro de Custo</th>
            <th>Unidade</th>
            <th>Departamento</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.costCenter}</td>
              <td>{item.unit}</td>
              <td>{item.department}</td>
              <td>{item.date.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
