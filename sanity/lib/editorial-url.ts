export function getSafeEditorialUrl(value: string | null | undefined): string | null {
  if (
    !value ||
    value.trim() !== value ||
    value.includes("\\") ||
    [...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
  ) {
    return null;
  }

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const url = new URL(value);

    if (["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) {
      return value;
    }
  } catch {}

  return null;
}
