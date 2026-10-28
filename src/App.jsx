import { employees } from "./employees.js";

function App() {
  return (
    <main>
      <h1>Календарь отсутствий</h1>
      <p>Отпуска, командировки и больничные сотрудников</p>

      <h2>Октябрь 2026</h2>

      <div className="calendar">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Сотрудник</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
               <tr key={employee.id}>
                <td>{employee.employeeName}</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
                <td>—</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;