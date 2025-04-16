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

export function GetMidtoneColour() {
  return generateHSL([0, 360], [60, 100], [40, 60]);
}

export function GetNatureColour() {
  return generateHSL([90, 130], [50, 70], [50, 70]);
}

export function GetNatureDarkColour() {
  return generateHSL([90, 130], [40, 40], [20, 25]);
}
