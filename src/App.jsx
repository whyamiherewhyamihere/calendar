import { useState } from "react";
import { employees } from "./employees.js";
import { months, getDays, getInitialAbsences } from "./calendar.js";

function App() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(9);
  const [selectedAbsences, setSelectedAbsences] = useState(() =>
    getInitialAbsences(employees)
  );

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

      <p>Б — больничный, О — отпуск, К — командировка</p>

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

                {days.map((day) => {
                  const cellKey =
                    employee.id + "-" + year + "-" + month + "-" + day;

                  const type = selectedAbsences[cellKey] || "";

                  return (
                    <td key={day} className={"absence-cell " + type}>
                      <select
                        className="absence-select"
                        aria-label="Тип отсутствия"
                        value={type}
                        onChange={(event) =>
                          setSelectedAbsences({
                            ...selectedAbsences,
                            [cellKey]: event.target.value
                          })
                        }
                      >
                        <option value="">—</option>
                        <option value="sick">Б</option>
                        <option value="vacation">О</option>
                        <option value="trip">К</option>
                      </select>
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