import { format } from 'date-fns';

export default function formatDate(date) {
  let formattedDate;
  try {
    formattedDate = format(new Date(date), 'MMMM d yyyy');
  } catch (err) {
    formattedDate = false;
  }
  return formattedDate;
}
