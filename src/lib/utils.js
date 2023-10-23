export function formatDateFromEpoch(epochTime) {
  const date = new Date(epochTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}/${month}/${year}`;
  const amOrPm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")}${amOrPm}`;

  return `${formattedDate} ${formattedTime}`;
}

export function calculateEmailRange(page) {
  const totalEmails = 30;
  const startIndex = (page - 1) * 15 + 1;
  const endIndex = page * 15;

  return `${startIndex}-${endIndex} of ${totalEmails}`;
}
