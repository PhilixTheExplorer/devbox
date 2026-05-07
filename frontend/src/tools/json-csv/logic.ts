export type JsonCsvMode = "json-to-csv" | "csv-to-json";
export type CsvDelimiter = "," | ";" | "\t" | "|";

export type JsonCsvResult = {
  output: string;
  rows: number;
  columns: number;
  error: string | null;
};

function escapeCsv(value: unknown, delimiter: string) {
  const text = value === null || value === undefined ? "" : String(value);
  return text.includes(delimiter) || /["\n\r]/.test(text)
    ? `"${text.replace(/"/g, '""')}"`
    : text;
}

function flatten(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).map(([key, next]) => [
      key,
      next && typeof next === "object" ? JSON.stringify(next) : next,
    ]),
  );
}

function jsonToCsv(input: string, delimiter: string): JsonCsvResult {
  const parsed = JSON.parse(input);
  const rows = (Array.isArray(parsed) ? parsed : [parsed]).map((row) =>
    flatten(row as Record<string, unknown>),
  );
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const output = [
    headers.map((header) => escapeCsv(header, delimiter)).join(delimiter),
    ...rows.map((row) =>
      headers
        .map((header) => escapeCsv(row[header], delimiter))
        .join(delimiter),
    ),
  ].join("\n");

  return { output, rows: rows.length, columns: headers.length, error: null };
}

function parseCsv(input: string, delimiter: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === delimiter) {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);
  return rows.filter((nextRow) => nextRow.some((value) => value.trim()));
}

function csvToJson(input: string, delimiter: string): JsonCsvResult {
  const [headers = [], ...rows] = parseCsv(input, delimiter);
  const data = rows.map((row) =>
    Object.fromEntries(
      headers.map((header, index) => [header, row[index] ?? ""]),
    ),
  );

  return {
    output: JSON.stringify(data, null, 2),
    rows: data.length,
    columns: headers.length,
    error: null,
  };
}

export function convertJsonCsv(
  input: string,
  mode: JsonCsvMode,
  delimiter = ",",
): JsonCsvResult {
  try {
    return mode === "json-to-csv"
      ? jsonToCsv(input, delimiter)
      : csvToJson(input, delimiter);
  } catch (error) {
    return {
      output: "",
      rows: 0,
      columns: 0,
      error:
        error instanceof Error ? error.message : "Could not convert input.",
    };
  }
}
