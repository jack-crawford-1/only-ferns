export default function HeroImage() {
  return (
    <div className="absolute inset-0 z-0 dark:opacity-40">
      <img
        src="./herofern.png"
        alt="Hero Fern"
        className="w-full h-full object-cover md:object-contain"
      />
    </div>
  );
}
