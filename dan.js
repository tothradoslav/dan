import en from './locale/en.js';
import sk from './locale/sk.js';

const locales = {en, sk}

const danData = {
  firstYear: 1970,
  weekdayOfZeroDay: 4,
  years: Array.from({length: 101}, (_, i) => i === 0 ? 0 : Array.from({length: i}, (_, k) => 365 + (new Date(1970 + k, 1, 29).getDate() === 29 ? 1 : 0)).reduce((s, d) => s + d, 0)),
  months: [
    [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
    [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
  ],
}

// creator

export function dan(date = null, format = null, formatLanguage) {
  let result;
  if (date === null) {
    result = dateToDan(new Date());
  } else if (date?.$isDayjsObject) {
    result = formatDanNumber(date.$y, date.$M + 1, date.$D);
  } else if (date instanceof Date) {
    result = dateToDan(date);
  } else if (typeof date === 'number') {
    if (date > 20000000 && date < 30000000) {
      result = date;
    }
  } else if (typeof date === 'string') {
    const cleanedDate = date.replace(/[^0-9]/g, '');
    if (cleanedDate.length === 8) result = parseInt(date, 10);
  }

  return format !== null ? danFormat(result, format, formatLanguage) : result;
}

// manipulators

export function danAdd(dan, amount, unit, format = null, formatLanguage) {
  let result;
  if (unit === 'd') {
    const jdn = danToJdn(dan);
    result = jdnToDan(jdn + amount);
  } else if (unit === 'm') {
    const {year, month, day} = parseDan(dan);
    let newYear = year;
    let newMonth = month + amount;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }
    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }
    const maxDay = danDaysInMonth(newYear, newMonth);
    const newDay = Math.min(day, maxDay);
    result = formatDanNumber(newYear, newMonth, newDay);
  } else if (unit === 'y') {
    const {year, month, day} = parseDan(dan);
    const newYear = year + amount;
    const maxDay = danDaysInMonth(newYear, month);
    const newDay = Math.min(day, maxDay);
    result = formatDanNumber(newYear, month, newDay);
  } else if (unit === 'w') {
    const jdn = danToJdn(dan);
    result = jdnToDan(jdn + amount * 7);
  } else {
    throw new Error('Unsupported unit: ' + unit);
  }
  return format !== null ? danFormat(result, format, formatLanguage) : result;
}

export function danSubtract(dan, amount, unit, format = null, formatLanguage) {
  return danAdd(dan, -amount, unit, format, formatLanguage);
}

export function danSet(dan, unit, value, format = null, formatLanguage) {
  const {year, month, day} = parseDan(dan);
  let result;
  if (unit === 'y') {
    const newYear = value;
    const maxDay = danDaysInMonth(newYear, month);
    const newDay = Math.min(day, maxDay);
    result = formatDanNumber(newYear, month, newDay);
  } else if (unit === 'm') {
    const newMonth = value;
    const maxDay = danDaysInMonth(year, newMonth);
    const newDay = Math.min(day, maxDay);
    result = formatDanNumber(year, newMonth, newDay);
  } else if (unit === 'd') {
    const maxDay = danDaysInMonth(year, month);
    const newDay = value > maxDay ? maxDay : value;
    result = formatDanNumber(year, month, newDay);
  } else {
    throw new Error('Unsupported unit: ' + unit);
  }
  return format !== null ? danFormat(result, format, formatLanguage) : result;
}

export function danStartOf(dan, unit, format = null, formatLanguage) {
  const {year, month} = parseDan(dan);
  let result;
  if (unit === 'm') {
    result = formatDanNumber(year, month, 1);
  } else if (unit === 'y') {
    result = formatDanNumber(year, 1, 1);
  } else if (unit === 'w') {
    const jdn = danToJdn(dan);
    const startOfWeek = jdn - (danWeekday(dan) - 1);
    result = jdnToDan(startOfWeek);
  } else {
    throw new Error('Unsupported unit: ' + unit);
  }
  return format !== null ? danFormat(result, format, formatLanguage) : result;
}

export function danEndOf(dan, unit, format = null, formatLanguage) {
  const {year, month} = parseDan(dan);
  let result;
  if (unit === 'm') {
    const lastDayOfMonth = danDaysInMonth(year, month);
    result = formatDanNumber(year, month, lastDayOfMonth);
  } else if (unit === 'y') {
    result = formatDanNumber(year, 12, 31);
  } else if (unit === 'w') {
    const jdn = danToJdn(dan);
    const endOfWeek = jdn + (7 - danWeekday(dan));
    result = jdnToDan(endOfWeek);
  } else {
    throw new Error('Unsupported unit: ' + unit);
  }
  return format !== null ? danFormat(result, format, formatLanguage) : result;
}

// getters

export function danGet(dan, unit) {
  const {year, month, day} = parseDan(dan);
  if (unit === 'y') return year;
  if (unit === 'm') return month;
  if (unit === 'd') return day;
  throw new Error('Unsupported unit: ' + unit);
}

export function danNightsArray(start, end) {
  const jdnFirst = danToJdn(start);
  const jdnLast = danToJdn(end);
  if (jdnFirst > jdnLast) return [];
  const nights = [];
  for (let jdn = jdnFirst; jdn < jdnLast; jdn++) {
    nights.push(jdnToDan(jdn));
  }
  return nights;
}

export function danNightsCount(start, end) {
  const jdnFirst = danToJdn(start);
  const jdnLast = danToJdn(end);
  if (jdnFirst > jdnLast) return 0;
  return jdnLast - jdnFirst;
}

export function danToDate(dan) {
  const parsed = parseDan(dan);
  return new Date(parsed.year, parsed.month - 1, parsed.day);
}

export function danWeekday(dan) {
  const weekday = (danToJdn(dan) + danData.weekdayOfZeroDay) % 7;
  return weekday === 0 ? 7 : weekday; // convert 0 to 7
}

export function danDaysInMonth(year, month) {
  return getMonthDays(year)[month];
}

export function isDan(dan) {
  return dan && typeof dan === 'number' && dan >= 20000000 && dan <= 30000000;
}

function parseDan(dan) {
  if (!isDan(dan)) dan = dan(dan);
  if (typeof dan === 'string') dan = parseInt(dan, 10);
  return {
    year: Math.floor(dan / 10000),
    month: Math.floor((dan % 10000) / 100),
    day: dan % 100,
  };
}

function formatDanNumber(year, month, day) {
  return year * 10000 + month * 100 + day;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getMonthDays(year) {
  return [0, 31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}


// Converts a Dan (YYYYMMDD) to a day index (number of days since 1970-01-01)
function danToJdnOld(dan) {
  const {year, month, day} = parseDan(dan);
  let days = 0;
  // Accumulate days for full years from 1970 up to (but not including) the given year
  for (let y = danData.firstYear; y < year; y++) {
    days += isLeapYear(y) ? 366 : 365;
  }
  // Add days for the months passed in the current year
  const monthDays = getMonthDays(year);
  for (let m = 1; m < month; m++) {
    days += monthDays[m];
  }
  // Add the days passed in the current month (using zero-based index)
  days += (day - 1);
  return days;
}

function danToJdn(dan) {
  const {year, month, day} = parseDan(dan);
  return danData['years'][year - danData.firstYear] + danData['months'][isLeapYear(year) ? 1 : 0][month - 1] + day - 1;
}

// Converts a day index (number of days since 1970-01-01) back to a Dan (YYYYMMDD)
function jdnToDanOld(dayIndex) {
  if (!dayIndex) {
    console.log('ERROR jdnToDan', dayIndex, new Error().stack);
    return dan();
  }
  let year = danData.firstYear;
  // Determine the year by subtracting full years' days
  while (true) {
    const daysInYear = isLeapYear(year) ? 366 : 365;
    if (dayIndex < daysInYear) break;
    dayIndex -= daysInYear;
    year++;
  }
  // Determine the month by subtracting each month's days
  const monthDays = getMonthDays(year);
  let month = 1;
  for (let i = 1; i < 13; i++) {
    if (dayIndex < monthDays[i]) {
      month = i;
      break;
    }
    dayIndex -= monthDays[i];
  }
  // The remaining dayIndex corresponds to the day (add 1 because day count is zero-based)
  const day = dayIndex + 1;
  return formatDanNumber(year, month, day);
}

function jdnToDan(dayIndex) {
  const yearsIndex = danData.years.findIndex((days) => days > dayIndex) - 1;
  const year = yearsIndex + danData.firstYear;
  const isLeap = isLeapYear(year) ? 1 : 0
  dayIndex -= danData.years[yearsIndex];
  const month = danData.months[isLeap].findIndex((days) => days > dayIndex);
  dayIndex -= danData.months[isLeap][month - 1];
  return formatDanNumber(year, month, dayIndex + 1);
}

function danFormat(dan, format = 'YYYY-MM-DD', language = 'en') {
  if (format === 'date') return danToDate(dan);
  if (format === 'string') return dan.toString();


  const {year, month, day} = parseDan(dan);
  return format
      .replace('MMMM', locales[language].monthNames[month - 1]) // names stored in 0-11
      .replace('MMM', locales[language].monthNamesShort[month - 1]) // names stored in 0-11
      .replace('MM', month < 10 ? '0' + month : month.toString())
      .replace('M', month.toString())

      .replace('DD', day < 10 ? '0' + day : day.toString())
      .replace('D', day.toString())
      .replace('dddd', locales[language].weekdayNamesLong[danWeekday(dan) - 1]) // names stored in 0-6
      .replace('ddd', locales[language].weekdayNames[danWeekday(dan) - 1]) // names stored in 0-6

      .replace('YYYY', year.toString())
}

function dateToDan(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  const day = date.getDate();
  return formatDanNumber(year, month, day);
}