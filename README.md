# Date As Number
**Ultra fast library for working with dates when you don't need specific time, timezones or daylight saving times.**

> This is a work-in-progress, API may change.

## What?
Dan works with dates as numbers, such as 20250507 (May 7, 2025), ignoring smaller units of time, such as hours, minutes, seconds, etc...

## Why?
* very fast (100x faster than manipulating regular JS dates with dayjs)
* dans are JSON-able (just a number)
* human-readable when stored (in DB or files) 
* easy and performant date comparisons or manipulations (e.g. sorting, start < end, etc.)
* simple functions, no need to create objects, no chaining, return value is always a number (dan), unless asked to be formatted
* zero dependencies
* only for julian calendar

## When to use?
Use dan when manipulating days and ignoring smaller units (hours, minutes, seconds).

In our project, we needed a fast solution to work with accommodation dates (check-in, check-out) and we didn't need time, timezones or daylight saving times. We needed to be able to quickly compare dates, add or subtract days, weeks, months or years, and get the number of nights between two dates (length of stay).

## Install
```npm i @radkototh/dan```

## Examples
```javascript
const today = dan() // 20250507 (today)

dan('2025-05-07') // 20250507
dan('20250507') // 20250507
dan(20250507) // 20250507
dan(new Date()) // 20250507
dan(dayjs()) // 20250507


danAdd(today, 1, 'd') // 20250508
danSubtract(today, 1, 'd') // 20250506
danStartOf(today, 'm') // 20250501
danEndOf(today, 'm') // 20250531
danGet(today, 'd') // 7
danGet(today, 'y') // 2025

dan(null, 'YYYY-MM-DD') // 2025-05-07
danAdd(null, 1, 'd', 'YYYY-MM-DD') // 2025-05-08

dan(20251201, 'dddd'') // Monday
dan(20251201, 'dddd', 'en') // Monday
dan(20251201, 'dddd', 'sk') // pondelok


danNightsArray('2025-05-07', '2025-05-10') // [20250507, 20250508, 20250509] (last 
danNightsCount('2025-05-07', '2025-05-10') // 3

isDan(today) // true
```

## API
> **dan** is short for "date as number", such as 20250507 (May 7, 2025).
>
> As a param in the API functions, dan means you can pass a number (20250507), a JS Date(), string ('2025-05-07', '20250507'), dayjs object or null = today.


### dan(dan, format?, language?)  
Creates a dan from a string, number, Date() object, dayjs. Returns a dan unless format is specified.
* `dan` - a JS Date(), string ('2025-05-07', '20250507'), number (20250507), dayjs object or null = today
* `format` - optional string, when specified, returns a string in the specified format
* `language` - optional string, when specified, returns the formatted string in the specified language. English is default.


### danAdd(dan, amount, unit, format?, language?)  
Adds a number of units to a dan. Returns a dan unless format is specified.
* `dan` - dan (see dan)
* `amount` - number of units to add (can be negative)
* `unit` - string, one of 'd' = days, 'w' = weeks, 'm' = months, 'y' = years
* `format` - same as with dan()
* `language` - same as with dan()


### danSubtract(dan, amount, unit, format?, language?)  
Subtracts a number of units from a dan. Works the same as danAdd() with negative amount.


### danSet(dan, unit, value, format?, language?)  
Sets a specific unit of a date. Returns a dan unless format is specified.
* `dan` - dan (see dan)
* `unit` - string, one of 'd' = days, 'm' = months, 'y' = years
* `value` - number, the value to set the unit to


### danStartOf(dan, unit, format?, language?)  
Sets a date to the start of a specific unit. Returns a dan unless format is specified.
* `dan` - dan (see dan)
* `unit` - string, one of 'w' = week', m' = month, 'y' = year


### danEndOf(dan, unit, format?, language?)  
Sets a date to the end of a specific unit. Returns a dan unless format is specified.
* `dan` - dan (see dan)
* `unit` - string, one of 'w' = week', m' = month, 'y' = year


### danGet(dan, unit)  
Gets a specific unit of a date. Returns a number.
* `dan` - dan (see dan)
* `unit` - string, 'd' = days, 'm' = months, 'y' = years, 'w' = ISO week, 'wd' = weekday


### danNightsArray(start, end)   
Returns an array of dates (numbers) between start and end, exclusive.
* `start` - dan (see dan)
* `end` - dan (see dan)

Example: `danNightsArray('2025-05-07', '2025-05-10')` returns [20250507, 20250508, 20250509] (May 7, 8 and 9)


### danNightsCount(start, end) alias danDiff(start, end)  
Returns the number of nights between start and end, exclusive.
* `start` - dan (see dan)
* `end` - dan (see dan)

Example: `danNightsCount('2025-05-07', '2025-05-10')` returns 3 (May 7, 8 and 9)


### danToDate(dan)  
Converts a dan to a Date() object.


### isDan(dan)  
Checks if a dan is valid (number), returns true or false.


### danWeekday(dan)  
Returns the weekday of a dan (1 = Monday, ..., 7 = Sunday).


### danFormat(dan, format, language)  
Formats a dan to a string in the specified format and language. Returns a string.


### danDaysInMonth(dan) or danDaysInMonth(year, month)
Returns the number of days in the month of the dan. If two params are passed, the first is the year and the second is the month (1-12).


## Todo
* allow configuration (first day of week, epoch start (1970 default))
* format compatible with dayjs, update readme
* add more locales

## Contributing
If you want to contribute, please fork the repo and create a pull request.

If you have any questions or suggestions, please [open an issue](https://github.com/tothradoslav/dan).

Dan focuses on **peformance**. If you can make it faster, please fork the repo and create a pull request or [open an issue](https://github.com/tothradoslav/dan).