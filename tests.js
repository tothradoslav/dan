import {danAdd, danCreate, danDaysInMonth, danEndOf, danGet, danNightsArray, danNightsCount, danSet, danStartOf, danSubtract, danToDate, danWeekday} from './dan.js';

const today = parseInt(new Date().toLocaleDateString('sv').replace(/-/g,''));
const tests = [
  [danCreate(), today],
  [danCreate(new Date()), today],
  [danCreate(20250218), 20250218],
  [danCreate('20250218'), 20250218],
  [danCreate('20250218', 'date'), new Date(2025, 1, 18)],
  [danCreate('20250218', 'string'), '20250218'],
  [danCreate('20250218', 'YYYY-MM-DD'), '2025-02-18'],
  [danCreate('20251218', 'YYYY-MM-DD'), '2025-12-18'],
  [danCreate('20251201', 'YYYY-MM-DD'), '2025-12-01'],
  [danCreate('20251201', 'D'), '1'],
  [danCreate('20251201', 'dddd', 'sk'), 'pondelok'],
  [danCreate('20251201', 'ddd', 'sk'), 'po'],
  [danAdd(20250218, 1, 'd'), 20250219],
  [danAdd(20250218, 1, 'm'), 20250318],
  [danAdd(20250218, 1, 'y'), 20260218],
  [danAdd(20250218, 1, 'w'), 20250225],
  [danAdd(20250218, 2, 'w'), 20250304],
  [danSubtract(20250218, 1, 'd'), 20250217],
  [danSubtract(20250218, 1, 'm'), 20250118],
  [danSubtract(20250218, 1, 'y'), 20240218],
  [danSubtract(20250218, 1, 'w'), 20250211],
  [danSubtract(20250218, 3, 'w'), 20250128],
  [danSet(20250218, 'y', 2026), 20260218],
  [danSet(20250218, 'm', 6), 20250618],
  [danSet(20250218, 'd', 31), 20250228],
  [danSet(20250318, 'd', 31), 20250331],
  [danSet(20250418, 'd', 31), 20250430],
  [danStartOf(20250218, 'm'), 20250201],
  [danStartOf(20250218, 'y'), 20250101],
  [danStartOf(20250218, 'w'), 20250217],
  [danEndOf(20250218, 'm'), 20250228],
  [danEndOf(20250218, 'y'), 20251231],
  [danEndOf(20250218, 'w'), 20250223],
  [danGet(20250218, 'd'), 18],
  [danGet(20250218, 'm'), 2],
  [danGet(20250218, 'y'), 2025],
  [danNightsArray(20250218, 20250220), [20250218, 20250219, 20250220]],
  [danNightsArray(20250227, 20250302), [20250227, 20250228, 20250301, 20250302]],
  [danNightsArray(20240227, 20240302), [20240227, 20240228, 20240229, 20240301, 20240302]],
  [danNightsCount(20250218, 20250220), 3],
  [danNightsCount(20250227, 20250302), 4],
  [danNightsCount(20240227, 20240302), 5],
  [danToDate(20250218), new Date(2025, 1, 18)],
  [danWeekday(20250217), 1],
  [danWeekday(20250218), 2],
  [danWeekday(20250223), 7],
  [danWeekday(20250304), 2],
  [danDaysInMonth(2025, 2), 28],
  [danDaysInMonth(2024, 2), 29],
  [danDaysInMonth(2025, 1), 31],
  [danDaysInMonth(2025, 4), 30],
];

tests.forEach(([input, expected], index) => {
  if (JSON.stringify(input) !== JSON.stringify(expected)) {
    console.error(`Test ${index + 1} failed: expected ${expected}, but got ${input}`);
  } else {
    console.log(`Test ${index + 1} passed`);
  }
});