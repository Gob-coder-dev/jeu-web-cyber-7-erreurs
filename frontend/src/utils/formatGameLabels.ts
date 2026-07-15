export function formatOrderNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function formatScenarioTitle(
  title: string,
  index: number,
  caseLabel = "Dossier",
) {
  return `${caseLabel} ${formatOrderNumber(index)} - ${title}`;
}

export function formatPieceTitle(
  title: string,
  index: number,
  pieceLabel = "Pièce",
) {
  return `${pieceLabel} ${formatOrderNumber(index)} - ${title}`;
}

export function formatPieceCode(index: number) {
  return `P${formatOrderNumber(index)}`;
}
