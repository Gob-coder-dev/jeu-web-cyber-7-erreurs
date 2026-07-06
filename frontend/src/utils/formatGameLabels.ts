export function formatOrderNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function formatScenarioTitle(title: string, index: number) {
  return `Dossier ${formatOrderNumber(index)} - ${title}`;
}

export function formatPieceTitle(title: string, index: number) {
  return `Pièce ${formatOrderNumber(index)} - ${title}`;
}

export function formatPieceCode(index: number) {
  return `P${formatOrderNumber(index)}`;
}
