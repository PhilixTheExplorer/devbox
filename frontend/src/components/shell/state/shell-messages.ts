"use client";

export function postToSameOriginParent(message: { type: string }) {
  if (window.parent === window) {
    return;
  }

  window.parent.postMessage(message, window.location.origin);
}
