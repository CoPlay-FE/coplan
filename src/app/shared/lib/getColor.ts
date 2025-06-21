export function getColor(text: string, colorArrayLength: number): number {
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % colorArrayLength
  return index
}
