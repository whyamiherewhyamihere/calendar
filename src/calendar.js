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