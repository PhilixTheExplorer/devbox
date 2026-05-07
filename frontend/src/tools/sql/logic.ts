export type SqlMode = "pretty" | "compact";

const keywords = [
  "select",
  "from",
  "where",
  "join",
  "left join",
  "right join",
  "inner join",
  "outer join",
  "group by",
  "order by",
  "having",
  "limit",
  "offset",
  "insert into",
  "values",
  "update",
  "set",
  "delete from",
];

export function formatSql(input: string, mode: SqlMode = "pretty") {
  const compact = input.trim().replace(/\s+/g, " ");
  if (mode === "compact") return compact;

  let output = compact;
  for (const keyword of keywords) {
    output = output.replace(
      new RegExp(`\\b${keyword.replace(" ", "\\s+")}\\b`, "gi"),
      (match) => `\n${match.toUpperCase()}`,
    );
  }

  output = output
    .replace(/\s*,\s*/g, ",\n  ")
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")")
    .trim();

  return output.endsWith(";") ? output : `${output};`;
}
