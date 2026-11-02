import { useState } from "react";
import { employees } from "./employees.js";
import { months, getDays, getInitialAbsences } from "./calendar.js";

function App() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9);

  const [selectedAbsences, setSelectedAbsences] = useState(() => {
    const initialAbsences = getInitialAbsences(employees);
    const saved = localStorage.getItem("calendar-absences");

    if (saved) {
      const savedAbsences = JSON.parse(saved);
      const result = { ...initialAbsences, ...savedAbsences };

      return result;
    }

    return initialAbsences;
  });

  const days = getDays(year, month);

  function changeMonth(step) {
    const date = new Date(year, month + step, 1);

    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }

  function changeAbsence(cellKey, type) {
    const newAbsences = { ...selectedAbsences };

    newAbsences[cellKey] = type;

    setSelectedAbsences(newAbsences);

    const saved = JSON.stringify(newAbsences);

    localStorage.setItem("calendar-absences", saved);
  }

  return (
    <main>
      <h1>Календарь отсутствий</h1>
      <p>Отпуска, командировки и больничные сотрудников</p>

      <div className="month-controls">
        <button
          onClick={() => changeMonth(-1)}
          aria-label="Предыдущий месяц"
        >
          &lt;
        </button>

        <h2>
          {months[month]} {year}
        </h2>

        <button
          onClick={() => changeMonth(1)}
          aria-label="Следующий месяц"
        >
          &gt;
        </button>

        <div className="legend">
          <div className="legend-item">
            <span className="legend-mark vacation">О</span>
            <span>Отпуск</span>
          </div>

          <div className="legend-item">
            <span className="legend-mark trip">К</span>
            <span>Командировка</span>
          </div>

          <div className="legend-item">
            <span className="legend-mark sick">Б</span>
            <span>Больничный</span>
          </div>
        </div>
      </div>

      <div className="calendar">
        <table className="calendar-table">
          <thead>
            <tr>
              <th className="employee-name">Сотрудник</th>

              {days.map((day) => (
                <th key={day} className="day-number">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="employee-name">
                  {employee.employeeName}
                </td>

                {days.map((day) => {
                  const cellKey =
                    employee.id + "-" + year + "-" + month + "-" + day;

                  const type = selectedAbsences[cellKey] || "";

                  return (
                    <td key={day} className="absence-cell">
                      <div className="cell-content">
                        <select
                          className={"absence-select " + type}
                          aria-label="Тип отсутствия"
                          value={type}
                          onChange={(event) =>
                            changeAbsence(cellKey, event.target.value)
                          }
                        >
                          <option value=""></option>
                          <option value="vacation">О</option>
                          <option value="trip">К</option>
                          <option value="sick">Б</option>
                        </select>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;