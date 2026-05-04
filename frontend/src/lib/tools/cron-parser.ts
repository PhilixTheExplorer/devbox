export type CronAnalysis = {
  valid: boolean;
  error: string | null;
  fields: string[];
  explanation: string;
  nextRuns: string[];
};

type CronField = {
  label: string;
  min: number;
  max: number;
  names?: Record<string, number>;
};

const fields: CronField[] = [
  { label: "minute", min: 0, max: 59 },
  { label: "hour", min: 0, max: 23 },
  { label: "day of month", min: 1, max: 31 },
  {
    label: "month",
    min: 1,
    max: 12,
    names: {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    },
  },
  {
    label: "day of week",
    min: 0,
    max: 6,
    names: { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 },
  },
];

function parseNumber(value: string, field: CronField) {
  const named = field.names?.[value.toLowerCase()];
  if (named !== undefined) return named;
  const numeric = Number(value);
  return Number.isInteger(numeric) ? numeric : Number.NaN;
}

function parseField(source: string, field: CronField) {
  const values = new Set<number>();

  for (const rawPart of source.split(",")) {
    const [rangePart, stepPart] = rawPart.split("/");
    const step = stepPart ? Number(stepPart) : 1;
    if (!Number.isInteger(step) || step < 1) {
      throw new Error(`${field.label} has an invalid step`);
    }

    const [rawStart, rawEnd] =
      rangePart === "*" ? ["*", "*"] : rangePart.split("-");
    const start = rawStart === "*" ? field.min : parseNumber(rawStart, field);
    const end =
      rawEnd === undefined || rawEnd === "*"
        ? rawStart === "*"
          ? field.max
          : start
        : parseNumber(rawEnd, field);

    if (
      !Number.isInteger(start) ||
      !Number.isInteger(end) ||
      start < field.min ||
      end > field.max ||
      start > end
    ) {
      throw new Error(`${field.label} is outside ${field.min}-${field.max}`);
    }

    for (let value = start; value <= end; value += step) {
      values.add(value);
    }
  }

  return [...values].sort((a, b) => a - b);
}

function fieldSummary(source: string, field: CronField) {
  if (source === "*") return `every ${field.label}`;
  if (source.startsWith("*/"))
    return `every ${source.slice(2)} ${field.label}s`;
  return `${field.label}: ${source}`;
}

function matches(date: Date, parsed: number[][]) {
  return (
    parsed[0].includes(date.getMinutes()) &&
    parsed[1].includes(date.getHours()) &&
    parsed[2].includes(date.getDate()) &&
    parsed[3].includes(date.getMonth() + 1) &&
    parsed[4].includes(date.getDay())
  );
}

export function analyzeCron(
  input: string,
  startDate = new Date(),
  count = 5,
): CronAnalysis {
  const parts = input.trim().split(/\s+/).filter(Boolean);

  if (parts.length !== 5) {
    return {
      valid: false,
      error: "Use five fields: minute hour day-of-month month day-of-week.",
      fields: parts,
      explanation: "",
      nextRuns: [],
    };
  }

  try {
    const parsed = parts.map((part, index) => parseField(part, fields[index]));
    const nextRuns: string[] = [];
    const cursor = new Date(startDate);
    cursor.setSeconds(0, 0);
    cursor.setMinutes(cursor.getMinutes() + 1);

    for (let guard = 0; guard < 525600 && nextRuns.length < count; guard += 1) {
      if (matches(cursor, parsed)) {
        nextRuns.push(cursor.toISOString());
      }
      cursor.setMinutes(cursor.getMinutes() + 1);
    }

    return {
      valid: true,
      error: null,
      fields: parts,
      explanation: parts
        .map((part, index) => fieldSummary(part, fields[index]))
        .join("; "),
      nextRuns,
    };
  } catch (error) {
    return {
      valid: false,
      error:
        error instanceof Error ? error.message : "Invalid cron expression.",
      fields: parts,
      explanation: "",
      nextRuns: [],
    };
  }
}
