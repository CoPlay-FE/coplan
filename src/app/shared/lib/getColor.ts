/**
 * Maps a string to a deterministic index within a custom color array.
 *
 * Computes a numeric hash from the input {@link text} and returns an index corresponding to a position in {@link customColors}.
 *
 * @param text - The input string to be mapped.
 * @param customColors - The array of color strings to map into.
 * @returns An index within {@link customColors} based on the hash of {@link text}.
 */
export function getColor(text: string, customColors: string[]): number {
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % customColors.length
  return index
}
