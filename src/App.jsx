import { useState } from "react";
import { employees } from "./employees.js";
import { months, getDays } from "./calendar.js";

function App() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9);

  const days = getDays(year, month);

  function changeMonth(step) {
    const date = new Date(year, month + step, 1);

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  return (
    <main>
      <h1>Календарь отсутствий</h1>
      <p>Отпуска, командировки и больничные сотрудников</p>

      <div className="month-controls">
        <button onClick={() => changeMonth(-1)}>Назад</button>

        <h2>
          {months[month]} {year}
        </h2>

        <button onClick={() => changeMonth(1)}>Вперёд</button>
      </div>

      <div className="calendar">
        <table className="calendar-table">
          <thead>
            <tr>
              <th>Сотрудник</th>

              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employeeName}</td>

                {days.map((day) => (
                  <td key={day}>—</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;