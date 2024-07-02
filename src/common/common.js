export const getPreviousDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1); // Subtract one day

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDate = dateString => {
  const date = new Date(dateString);

  // Define months array for month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get day, month, and year from the date object
  const day = date.toLocaleString('en-US', {weekday: 'long'});
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the date in "Day, Month Date Year" format
  const formattedDate = `${day}, ${date.getDate()} ${month} ${year}`;

  return formattedDate;
};

// Example usage:
const originalDateString = '2024-06-29T16:30:00Z';
const formattedDate = formatDate(originalDateString);
console.log(formattedDate); // Outputs: "Thursday, 29 June 2024"

console.log(getPreviousDate());
