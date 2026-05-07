export function getCurrentSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function toLocalDatetimeValue(date: Date) {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function getRelativeLabel(seconds: number, nowSeconds: number) {
  const diff = nowSeconds - seconds;

  if (Number.isNaN(diff)) {
    return "invalid";
  }

  if (Math.abs(diff) < 2) {
    return "just now";
  }

  const abs = Math.abs(diff);
  const unit =
    abs < 60
      ? ["s", abs]
      : abs < 3600
        ? ["m", Math.floor(abs / 60)]
        : abs < 86400
          ? ["h", Math.floor(abs / 3600)]
          : ["d", Math.floor(abs / 86400)];

  return diff < 0 ? `in ${unit[1]}${unit[0]}` : `${unit[1]}${unit[0]} ago`;
}

export function dateFromUnixSeconds(timestamp: string) {
  const seconds = Number.parseInt(timestamp, 10);
  if (Number.isNaN(seconds)) {
    return null;
  }

  const parsed = new Date(seconds * 1000);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function unixSecondsFromDateInput(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return Math.floor(date.getTime() / 1000);
}
