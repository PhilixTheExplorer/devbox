import { parse, stringify } from "yaml";

export type JsonYamlMode = "json-to-yaml" | "yaml-to-json";

export type JsonYamlResult = {
  output: string;
  error: string | null;
};

export function convertJsonYaml(
  input: string,
  mode: JsonYamlMode,
): JsonYamlResult {
  try {
    if (mode === "json-to-yaml") {
      return {
        output: stringify(JSON.parse(input)).trimEnd(),
        error: null,
      };
    }

    return {
      output: JSON.stringify(parse(input), null, 2),
      error: null,
    };
  } catch (error) {
    return {
      output: "",
      error:
        error instanceof Error ? error.message : "Could not convert input.",
    };
  }
}
