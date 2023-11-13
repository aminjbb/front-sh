import jalaliMoment from 'jalali-moment';

// Function to convert ISO date to Persian date
export function toPersianDate(isoDate) {
  // Parse the ISO date and convert it to a Persian date
  const moment = jalaliMoment(isoDate).locale('fa');
  const persianDate = moment.format('jYYYY/jM/jD');

  return persianDate;
}