function getRandomFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
  // gives us a whole number between min (inclusive) and max (exclusive)
}

function generateHSL(
  hueRange: [number, number],
  satRange: [number, number],
  lightRange: [number, number]
) {
  const hue = getRandomFromRange(...hueRange); // pick a hue value from the given range
  const saturation = getRandomFromRange(...satRange); // same for saturation — higher means more intense colour
  const lightness = getRandomFromRange(...lightRange); // controls how bright or dark the colour is
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  // builds a CSS HSL colour string like: hsl(120, 60%, 50%)
}

export function GetMidtoneColour() {
  return generateHSL([0, 360], [60, 100], [40, 60]);
  // covers full hue range (any colour), strong saturation, medium brightness
  // gives us bold, mid-bright colours
}

export function GetNatureColour() {
  return generateHSL([90, 130], [50, 70], [50, 70]);
  // focused on green-ish hues (90–130), mid saturation and lightness
}

export function GetNatureDarkColour() {
  return generateHSL([90, 130], [40, 40], [20, 25]);
  // same green hue range, but lower lightness and fixed saturation
}
