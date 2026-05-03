export type CaseMode =
  | "camel"
  | "pascal"
  | "snake"
  | "kebab"
  | "constant"
  | "dot"
  | "title"
  | "upper"
  | "lower"
  | "sentence";

export type CaseDefinition = {
  mode: CaseMode;
  label: string;
};

export type CaseResult = {
  output: string;
  error: string | null;
};

export const CASE_DEFINITIONS = [
  { mode: "camel", label: "camelCase" },
  { mode: "pascal", label: "PascalCase" },
  { mode: "snake", label: "snake_case" },
  { mode: "constant", label: "SCREAMING_SNAKE" },
  { mode: "kebab", label: "kebab-case" },
  { mode: "dot", label: "dot.case" },
  { mode: "title", label: "Title Case" },
  { mode: "upper", label: "UPPER CASE" },
  { mode: "lower", label: "lower case" },
  { mode: "sentence", label: "Sentence case" },
] as const satisfies readonly CaseDefinition[];

function splitWords(input: string) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function capitalize(word: string) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function convertCase(input: string, mode: CaseMode): CaseResult {
  const words = splitWords(input);

  if (words.length === 0) {
    return { output: "", error: null };
  }

  switch (mode) {
    case "camel":
      return {
        output: `${words[0]}${words.slice(1).map(capitalize).join("")}`,
        error: null,
      };
    case "pascal":
      return { output: words.map(capitalize).join(""), error: null };
    case "snake":
      return { output: words.join("_"), error: null };
    case "kebab":
      return { output: words.join("-"), error: null };
    case "constant":
      return { output: words.join("_").toUpperCase(), error: null };
    case "dot":
      return { output: words.join("."), error: null };
    case "upper":
      return { output: input.toUpperCase(), error: null };
    case "lower":
      return { output: input.toLowerCase(), error: null };
    case "sentence":
      return {
        output: [capitalize(words[0]), ...words.slice(1)].join(" "),
        error: null,
      };
    case "title":
      return { output: words.map(capitalize).join(" "), error: null };
  }
}

export function convertAllCases(input: string) {
  return CASE_DEFINITIONS.map((definition) => ({
    ...definition,
    result: convertCase(input, definition.mode),
  }));
}
