function getRandomFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHSL(
  hueRange: [number, number],
  satRange: [number, number],
  lightRange: [number, number]
) {
  const hue = getRandomFromRange(...hueRange);
  const saturation = getRandomFromRange(...satRange);
  const lightness = getRandomFromRange(...lightRange);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function GetRandomColour() {
  return generateHSL([0, 360], [50, 100], [20, 60]);
}

export function GetMidtoneColour() {
  return generateHSL([0, 360], [60, 100], [40, 60]);
}

export function GetNatureColour() {
  return generateHSL([90, 130], [50, 70], [50, 70]);
}
