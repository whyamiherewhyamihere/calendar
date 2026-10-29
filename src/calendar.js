export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

export function getDays(year, month) {
  const count = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= count; day++) {
    days.push(day);
  }

  return days;
}

export function getInitialAbsences(employees) {
  const result = {};

  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    for (let j = 0; j < employee.absences.length; j++) {
      const absence = employee.absences[j];

      const date = new Date(absence.startDate + "T00:00:00");
      const endDate = new Date(absence.endDate + "T00:00:00");

      while (date <= endDate) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const key = employee.id + "-" + year + "-" + month + "-" + day;

        result[key] = absence.type;

        date.setDate(day + 1);
      }
    }
  }

  return result;
}