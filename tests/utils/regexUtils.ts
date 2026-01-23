export function extractCountFromButton(text: string): number {
  const match = text.match(/\d+/);
  return match ? Number(match[0]) : 0;
}
