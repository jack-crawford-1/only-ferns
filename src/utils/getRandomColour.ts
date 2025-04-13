export function GetRandomColour() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 200;
  const lightness = Math.floor(Math.random() * 40) + 20;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function GetMidtoneColour() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60;
  const lightness = Math.floor(Math.random() * 20) + 40;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function GetNatureColour() {
  const hue = Math.floor(Math.random() * 40) + 90;
  const saturation = Math.floor(Math.random() * 20) + 50;
  const lightness = Math.floor(Math.random() * 20) + 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
