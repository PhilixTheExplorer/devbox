export function createUuid() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) => {
    const byte = crypto.getRandomValues(new Uint8Array(1))[0];
    return (Number(char) ^ (byte & (15 >> (Number(char) / 4)))).toString(16);
  });
}

export function createUuids(count: number) {
  return Array.from({ length: count }, createUuid);
}

export function formatUuid(uuid: string, uppercase: boolean, hyphens: boolean) {
  const normalized = hyphens ? uuid : uuid.replaceAll("-", "");
  return uppercase ? normalized.toUpperCase() : normalized;
}

export function formatUuids(
  uuids: string[],
  uppercase: boolean,
  hyphens: boolean,
) {
  return uuids.map((uuid) => formatUuid(uuid, uppercase, hyphens)).join("\n");
}

export function clampUuidCount(count: number) {
  return Math.min(100, Math.max(1, count));
}
