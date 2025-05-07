# Date As Number
**Ultra fast library for working with dates when you don't need specific time, timezones or daylight saving times.**

> This is a work-in-progress, API may change.

## What?
Dan works with dates as numbers, such as 20250507 (May 7, 2025), ignoring smaller units of time, such as hours, minutes, seconds, etc...

## Why?
* very fast (100x - 1000x faster than manipulating regular JS dates with dayjs)
* values are JSON-able (just a number)
* human-readable when stored (in DB or files) 
* easy and performant date comparisons or manipulations (e.g. sorting, start < end, etc.)
* simple functions, no need to create objects, no chaining, result is always a number (dan), unless asked to be formatted
* only for julian calendar

## When to use?
Use dan when manipulating days and ignoring smaller units (hours, minutes, seconds).

In our project, we needed a fast solution to work with accommodation dates (check-in, check-out) and we didn't need time, timezones or daylight saving times. We needed to be able to quickly compare dates, add or subtract days, weeks, months or years, and get the number of nights between two dates (length of stay).

## Install
```npm i @radkototh/dan```

## Examples
```javascript
const today = danCreate() // 20250507 (today)
const tomorrow = danAdd(today, 1, 'd') // 20250508
const yesterday = danSubtract(today, 1, 'd') // 20250506
const startOfMonth = danStartOf(today, 'm') // 20250501
const endOfMonth = danEndOf(today, 'm') // 20250531
const day = danGet(today, 'd') // 7
const year = danGet(today, 'y') // 2025

const todayFormatted = danCreate(null, 'YYYY-MM-DD') // 2025-05-07
const tomorrowFormatted = danAdd(null, 1, 'd', 'YYYY-MM-DD') // 2025-05-08

const nightsArray = danNightsArray('2025-05-07', '2025-05-10') // [20250507, 20250508, 20250509] (last 
const nightsCount = danNightsCount('2025-05-07', '2025-05-10') // 3

const isValid = isDan(today) // true
```

## API
> **dan** is short for "date as number", such as 20250507 (May 7, 2025).
>
> As a param in the API functions, dan means you can pass a number (20250507), a new Date(), string ('2025-05-07', '20250507'), dayjs object or null = today.

```danCreate(dan, format?, language?)```  
Creates a date as number from a string, number, Date() object, dayjs. Returns a number unless format is specified.
* `dan` - date as Date(), string ('2025-05-07', '20250507'), number (20250507), null = today
* `format` - optional, string, when specified, returns a string in the specified format
* `language` - optional, string, when specified, returns the formatted string in the specified language. English is default.

```danAdd(dan, amount, unit, format?, language?)```  
Adds a number of units to a date. Returns a number unless format is specified.
* `dan` - date in any format (see danCreate)
* `amount` - number of units to add (can be negative)
* `unit` - string, one of 'd' = days, 'w' = weeks, 'm' = months, 'y' = years
* `format` - same as with danCreate()
* `language` - same as with danCreate()

```danSubtract(dan, amount, unit, format?, language?)```  
Subtracts a number of units from a date. Works the same as danAdd() with negative amount.

```danSet(dan, unit, value, format?, language?)```  
Sets a specific unit of a date. Returns a number unless format is specified.
* `dan` - date in any format (see danCreate)
* `unit` - string, one of 'd' = days, 'm' = months, 'y' = years
* `value` - number, the value to set the unit to

```danStartOf(dan, unit, format?, language?)```  
Sets a date to the start of a specific unit. Returns a number unless format is specified.
* `dan` - date in any format (see danCreate)
* `unit` - string, one of 'w' = week', m' = month, 'y' = year

```danEndOf(dan, unit, format?, language?)```  
Sets a date to the end of a specific unit. Returns a number unless format is specified.
* `dan` - date in any format (see danCreate)
* `unit` - string, one of 'w' = week', m' = month, 'y' = year

```danGet(dan, unit)```  
Gets a specific unit of a date. Returns a number.
* `dan` - date in any format (see danCreate)
* `unit` - string, one of 'd' = days, 'm' = months, 'y' = years

```danNightsArray(start, end)```  
Returns an array of dates (numbers) between start and end, exclusive.
* `start` - date in any format (see danCreate)
* `end` - date in any format (see danCreate)
* Example: `danNightsArray('2025-05-07', '2025-05-10')` returns [20250507, 20250508, 20250509] (May 7, 8 and 9)

```danNightsCount(start, end)```  
Returns the number of nights between start and end, exclusive.
* `start` - date in any format (see danCreate)
* `end` - date in any format (see danCreate)
* Example: `danNightsCount('2025-05-07', '2025-05-10')` returns 3 (May 7, 8 and 9)

```danToDate(dan)```  
Converts a dan to a Date() object.

```isDan(dan)```  
Checks if a dan is valid (number), returns true or false.

```danWeekday(dan)```  
Returns the weekday of a dan (0 = Sunday, 1 = Monday, ..., 6 = Saturday).

```danFormat(dan, format, language)```  
Formats a dan to a string in the specified format and language. Returns a string.

```danDaysInMonth(dan)```  
Returns the number of days in a month of a dan.

## Todo
* danNightsArray() - confusion about params - start / end or firstNight / lastNight??
* danWeekday() can be removed and replaced with danGet(dan, 'wd')
* danGet() add 'w' as week unit
* create danDaysCount() - same as nights but end inclusive
* create danDaysArray() - same as nights but end inclusive
* allow configuration (first day of week, epoch start (1970 default))
* format compatible with dayjs
* danCreate() could be renamed to dan()??
* danDaysInMonth() - two params (year, month) or one param (dan)
* readme - add examples for all functions, how tos
* readme - add formatting options

## Contributing
If you want to contribute, please fork the repo and create a pull request.

If you have any questions or suggestions, please [open an issue](https://github.com/tothradoslav/dan).

Dan focuses on **peformance**. If you have ideas for improvements, please let me know.