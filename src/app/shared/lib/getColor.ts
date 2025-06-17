export function getColor(text: string, customColors: string[]): number {
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % customColors.length
  return index
}
