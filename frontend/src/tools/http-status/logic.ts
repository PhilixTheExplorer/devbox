export type HttpStatus = {
  code: number;
  name: string;
  category: string;
  description: string;
};

export const HTTP_STATUSES: HttpStatus[] = [
  {
    code: 100,
    name: "Continue",
    category: "1xx",
    description: "Request headers accepted.",
  },
  { code: 200, name: "OK", category: "2xx", description: "Request succeeded." },
  {
    code: 201,
    name: "Created",
    category: "2xx",
    description: "Resource created.",
  },
  {
    code: 202,
    name: "Accepted",
    category: "2xx",
    description: "Request accepted for processing.",
  },
  {
    code: 204,
    name: "No Content",
    category: "2xx",
    description: "Success with no response body.",
  },
  {
    code: 301,
    name: "Moved Permanently",
    category: "3xx",
    description: "Resource has a permanent new URL.",
  },
  {
    code: 302,
    name: "Found",
    category: "3xx",
    description: "Resource is temporarily elsewhere.",
  },
  {
    code: 304,
    name: "Not Modified",
    category: "3xx",
    description: "Cached response can be reused.",
  },
  {
    code: 400,
    name: "Bad Request",
    category: "4xx",
    description: "Client sent an invalid request.",
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "4xx",
    description: "Authentication is required.",
  },
  {
    code: 403,
    name: "Forbidden",
    category: "4xx",
    description: "Client is not allowed.",
  },
  {
    code: 404,
    name: "Not Found",
    category: "4xx",
    description: "Resource was not found.",
  },
  {
    code: 409,
    name: "Conflict",
    category: "4xx",
    description: "Request conflicts with current state.",
  },
  {
    code: 422,
    name: "Unprocessable Content",
    category: "4xx",
    description: "Request was understood but invalid.",
  },
  {
    code: 429,
    name: "Too Many Requests",
    category: "4xx",
    description: "Rate limit exceeded.",
  },
  {
    code: 500,
    name: "Internal Server Error",
    category: "5xx",
    description: "Server hit an unexpected error.",
  },
  {
    code: 502,
    name: "Bad Gateway",
    category: "5xx",
    description: "Invalid response from upstream.",
  },
  {
    code: 503,
    name: "Service Unavailable",
    category: "5xx",
    description: "Server cannot handle the request now.",
  },
  {
    code: 504,
    name: "Gateway Timeout",
    category: "5xx",
    description: "Upstream response timed out.",
  },
];

export function searchHttpStatuses(query: string, category = "all") {
  const needle = query.trim().toLowerCase();
  return HTTP_STATUSES.filter((status) => {
    const inCategory = category === "all" || status.category === category;
    const inQuery =
      !needle ||
      String(status.code).includes(needle) ||
      status.name.toLowerCase().includes(needle) ||
      status.description.toLowerCase().includes(needle);
    return inCategory && inQuery;
  });
}
