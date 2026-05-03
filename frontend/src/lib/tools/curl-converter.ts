export type CurlResult = {
  output: string;
  error: string | null;
  summary: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string;
  } | null;
};

function tokenize(command: string) {
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;

  for (let index = 0; index < command.length; index += 1) {
    const char = command[index];
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
    } else if (char === "'" || char === '"') {
      quote = char;
    } else if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}

export function convertCurlToFetch(command: string): CurlResult {
  const tokens = tokenize(command.replace(/\\\r?\n/g, " "));
  if (tokens[0] !== "curl") {
    return {
      output: "",
      error: "Command must start with curl.",
      summary: null,
    };
  }

  const headers: Record<string, string> = {};
  let method = "GET";
  let body = "";
  let url = "";

  for (let index = 1; index < tokens.length; index += 1) {
    const token = tokens[index];
    const next = tokens[index + 1] ?? "";

    if (token === "-X" || token === "--request") {
      method = next.toUpperCase();
      index += 1;
    } else if (token === "-H" || token === "--header") {
      const separator = next.indexOf(":");
      if (separator > -1) {
        headers[next.slice(0, separator).trim()] = next
          .slice(separator + 1)
          .trim();
      }
      index += 1;
    } else if (
      ["-d", "--data", "--data-raw", "--data-binary"].includes(token)
    ) {
      body = next;
      if (method === "GET") method = "POST";
      index += 1;
    } else if (!token.startsWith("-")) {
      url = token;
    }
  }

  if (!url) {
    return {
      output: "",
      error: "Could not find a request URL.",
      summary: null,
    };
  }

  const init: string[] = [`method: ${JSON.stringify(method)}`];
  if (Object.keys(headers).length) {
    init.push(`headers: ${JSON.stringify(headers, null, 2)}`);
  }
  if (body) {
    init.push(`body: ${JSON.stringify(body)}`);
  }

  return {
    error: null,
    summary: { method, url, headers, body },
    output: `const response = await fetch(${JSON.stringify(url)}, {\n  ${init.join(",\n  ")}\n});\n\nconst data = await response.text();`,
  };
}
